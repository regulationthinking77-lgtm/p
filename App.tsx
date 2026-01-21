import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryLanding from './pages/CategoryLanding';
import CoursesList from './pages/CoursesList';
import CourseDetail from './pages/CourseDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import AdminDashboard from './pages/AdminDashboard';
import AdminCourses from './pages/AdminCourses';
import AdminStudents from './pages/AdminStudents';
import AdminPayments from './pages/AdminPayments';
import AdminSettings from './pages/AdminSettings';
import AuthPage from './pages/Auth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Course, ViewType, SiteSettings } from './types';
import { INITIAL_COURSES } from './constants';
import { db, auth } from './firebase';
import { doc, onSnapshot, setDoc, collection, writeBatch } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'DIPTO',
  heroHeading: 'Investing in Knowledge and Your Future',
  heroSubheading: 'Our e-learning programs have been developed to be a vehicle of delivering multimedia learning solutions for your business.',
  heroImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800',
  paymentsEnabled: true,
  maintenanceMode: false,
  metaTitle: 'DIPTO | Investing in Knowledge',
  metaDescription: 'Professional career courses and expert mentorship.'
};

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewType>('user');
  const [courses, setCourses] = useState<Course[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [user, setUser] = useState<{ email: string; isAdmin: boolean } | null>(null);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    // Listen for Auth changes
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const isAdmin = firebaseUser.email === 'diptoislam2006@gmail.com';
        setUser({ email: firebaseUser.email || '', isAdmin });
        if (isAdmin) setViewMode('admin');
      } else {
        setUser(null);
        setViewMode('user');
      }
      setLoading(false);
    });

    // Listen for Site Settings changes
    const unsubscribeSettings = onSnapshot(
      doc(db, 'settings', 'global'), 
      (docSnap) => {
        if (docSnap.exists()) {
          setSiteSettings(docSnap.data() as SiteSettings);
        } else {
          setDoc(doc(db, 'settings', 'global'), DEFAULT_SETTINGS).catch(() => {});
          setSiteSettings(DEFAULT_SETTINGS);
        }
      },
      (error) => {
        if (error.code === 'permission-denied') {
          setDbError("Firestore API is disabled or unconfigured in your Firebase Project.");
        }
        setSiteSettings(DEFAULT_SETTINGS);
      }
    );

    // Listen for Courses changes
    const unsubscribeCourses = onSnapshot(
      collection(db, 'courses'), 
      (querySnap) => {
        const coursesData: Course[] = [];
        querySnap.forEach((doc) => {
          coursesData.push(doc.data() as Course);
        });
        
        if (coursesData.length === 0) {
          setCourses(INITIAL_COURSES);
          const batch = writeBatch(db);
          INITIAL_COURSES.forEach(c => {
            batch.set(doc(db, 'courses', c.id), c);
          });
          batch.commit().catch(() => {});
        } else {
          setCourses(coursesData);
        }
      },
      (error) => {
        console.warn("Firestore courses error:", error);
        setCourses(INITIAL_COURSES);
      }
    );

    return () => {
      unsubscribeAuth();
      unsubscribeSettings();
      unsubscribeCourses();
    };
  }, []);

  const handleUpdateCourses = async (newCourses: Course[]) => {
    setCourses(newCourses);
  };

  const handleUpdateSettings = async (newSettings: SiteSettings) => {
    try {
      await setDoc(doc(db, 'settings', 'global'), newSettings);
      setSiteSettings(newSettings);
    } catch (e) {
      console.error("Failed to update settings:", e);
      setSiteSettings(newSettings);
      alert("Note: Settings were saved locally only. Please enable Firestore API in your Firebase Console to save permanently.");
    }
  };

  const handleLogin = (email: string, isAdmin: boolean) => {
    // Auth handled by AuthPage
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setViewMode('user');
  };

  const requireAdmin = (element: React.ReactElement) => {
    if (loading) return <div className="min-h-screen bg-[#0f1113] flex items-center justify-center text-white font-black uppercase tracking-widest">Loading Platform...</div>;
    return (user?.isAdmin) ? React.cloneElement(element, { dbError }) : <Navigate to="/auth" />;
  };

  const handleExitAdmin = () => {
    setViewMode('user');
  };

  if (loading) return null;

  if (siteSettings.maintenanceMode && !user?.isAdmin) {
    return (
      <div className="min-h-screen bg-[#0f1113] flex items-center justify-center p-10 text-center">
        <div className="max-w-md space-y-6">
          <div className="w-20 h-20 bg-orange-500/20 rounded-3xl flex items-center justify-center mx-auto border border-orange-500/30">
            <span className="text-4xl text-orange-500 font-bold">!</span>
          </div>
          <h1 className="text-4xl font-black text-white">Maintenance Mode</h1>
          <p className="text-slate-500 font-medium">We're currently updating the platform for a better experience. Please check back later.</p>
          <button onClick={() => window.location.href = '/#/auth'} className="text-xs font-bold text-slate-700 uppercase tracking-widest hover:text-white transition-colors">Admin Login</button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#0f1113]">
        {viewMode === 'user' && (
          <Navbar 
            user={user} 
            onLogout={handleLogout} 
          />
        )}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home courses={courses} settings={siteSettings} />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:slug" element={<CategoryLanding courses={courses} />} />
            <Route path="/courses" element={<CoursesList courses={courses} />} />
            <Route path="/course/:id" element={<CourseDetail courses={courses} />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/auth" element={<AuthPage onLogin={handleLogin} />} />
            
            <Route path="/admin" element={requireAdmin(<AdminDashboard courses={courses} onExitAdmin={handleExitAdmin} />)} />
            <Route path="/admin/courses" element={requireAdmin(<AdminCourses courses={courses} onUpdateCourses={handleUpdateCourses} onExitAdmin={handleExitAdmin} />)} />
            <Route path="/admin/students" element={requireAdmin(<AdminStudents onExitAdmin={handleExitAdmin} />)} />
            <Route path="/admin/payments" element={requireAdmin(<AdminPayments onExitAdmin={handleExitAdmin} />)} />
            <Route path="/admin/settings" element={requireAdmin(<AdminSettings settings={siteSettings} onUpdateSettings={handleUpdateSettings} onExitAdmin={handleExitAdmin} />)} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {viewMode === 'user' && <Footer />}
      </div>
    </Router>
  );
};

export default App;