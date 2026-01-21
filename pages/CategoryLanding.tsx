
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Course } from '../types';
import CourseCard from '../components/CourseCard';
import { 
  PenTool, 
  Code, 
  BarChart, 
  BookOpen, 
  ArrowLeft, 
  CheckCircle2, 
  Users, 
  Star, 
  ArrowRight,
  Clock,
  Zap,
  Award,
  MessageSquare,
  Activity
} from 'lucide-react';

interface CategoryLandingProps {
  courses: Course[];
}

const CATEGORY_MAP: Record<string, any> = {
  'ui-ux-design': {
    title: 'UI/UX Design',
    categoryName: 'Design',
    description: 'Master the principles of user-centric design. From user research and wireframing to high-fidelity prototyping and design systems, this path covers everything you need to become a professional designer.',
    icon: <PenTool />,
    color: '#ff2d55',
    stats: { students: '12K+', rating: '4.9', courses: '15+' },
    outcomes: ['Work as a Senior Product Designer', 'Build a world-class Figma portfolio', 'Lead design sprints', 'Master Design Systems'],
    syllabus: [
      { title: 'UX Research & Discovery', duration: '2 Weeks' },
      { title: 'Information Architecture & Wireframing', duration: '2 Weeks' },
      { title: 'Visual Design Systems in Figma', duration: '3 Weeks' },
      { title: 'Interactive Prototyping', duration: '2 Weeks' },
      { title: 'Usability Testing & Iteration', duration: '3 Weeks' }
    ]
  },
  'web-development': {
    title: 'Web Development',
    categoryName: 'Development',
    description: 'Build modern, responsive websites and applications. Start with the basics of HTML/CSS and progress to advanced frameworks like React, Next.js, and backend integration with Node.js.',
    icon: <Code />,
    color: '#ff9500',
    stats: { students: '25K+', rating: '4.8', courses: '28+' },
    outcomes: ['Fullstack Engineer roles', 'Launch complex SaaS apps', 'Optimized SEO & Performance', 'Cloud Infrastructure mastery'],
    syllabus: [
      { title: 'HTML5, CSS3 & Responsive Layouts', duration: '3 Weeks' },
      { title: 'Modern JavaScript (ES6+)', duration: '3 Weeks' },
      { title: 'React & State Management', duration: '4 Weeks' },
      { title: 'Node.js & Database Architecture', duration: '4 Weeks' },
      { title: 'Deployment & CI/CD Pipelines', duration: '2 Weeks' }
    ]
  },
  'digital-marketing': {
    title: 'Digital Marketing',
    categoryName: 'Marketing',
    description: 'Grow brands in the digital age. Learn SEO, SEM, social media strategy, and data analytics to drive results and build high-converting campaigns across all platforms.',
    icon: <Activity />,
    color: '#00bcd4',
    stats: { students: '18K+', rating: '4.7', courses: '12+' },
    outcomes: ['Growth Marketing Lead', 'Ads Specialist mastery', 'Advanced SEO implementation', 'Strategic Brand management'],
    syllabus: [
      { title: 'Marketing Fundamentals & Strategy', duration: '1 Week' },
      { title: 'SEO: Search Engine Optimization', duration: '2 Weeks' },
      { title: 'Paid Acquisition & SEM', duration: '2 Weeks' },
      { title: 'Content & Social Media Marketing', duration: '2 Weeks' },
      { title: 'Data Analytics & Reporting', duration: '1 Week' }
    ]
  },
  'practical-learning': {
    title: 'Practical Learning',
    categoryName: 'Business',
    description: 'Bridge the gap between theory and practice. Work on real-world industry projects, attend live workshops, and build a professional portfolio that stands out.',
    icon: <BookOpen />,
    color: '#a29bfe',
    stats: { students: '8K+', rating: '4.9', courses: '8+' },
    outcomes: ['Real-world project experience', 'Industry certifications', 'Direct mentorship access', 'Collaborative team environment'],
    syllabus: [
      { title: 'Problem Solving & Critical Thinking', duration: '2 Weeks' },
      { title: 'Industry Project: Simulation 1', duration: '3 Weeks' },
      { title: 'Industry Project: Simulation 2', duration: '3 Weeks' },
      { title: 'Portfolio Curation & Presentation', duration: '2 Weeks' },
      { title: 'Soft Skills for Professionals', duration: '2 Weeks' }
    ]
  }
};

const CategoryLanding: React.FC<CategoryLandingProps> = ({ courses }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const data = slug ? CATEGORY_MAP[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#131619] flex items-center justify-center text-center p-12 pt-40">
        <div className="space-y-6">
          <h1 className="text-4xl font-black text-white mb-6">Path Not Found</h1>
          <button onClick={() => navigate('/')} className="text-orange-500 font-bold underline text-lg">Return to Explorer</button>
        </div>
      </div>
    );
  }

  const filteredCourses = courses.filter(c => 
    c.category.toLowerCase().includes(data.categoryName.toLowerCase())
  );

  return (
    <div className="bg-[#0f1113] min-h-screen">
      {/* Dynamic Hero Section */}
      <section className="relative pt-48 pb-40 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.15] blur-[150px]" 
          style={{ background: `radial-gradient(circle at 50% 50%, ${data.color}, transparent)` }}
        ></div>
        
        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <Link to="/" className="inline-flex items-center space-x-2 text-slate-500 hover:text-white transition-colors mb-20 font-bold group">
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            <span className="text-lg">Back to Paths</span>
          </Link>

          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-2/3 space-y-12">
              <div className="inline-flex items-center space-x-4 bg-white/5 border border-white/10 px-6 py-3 rounded-full">
                 <div className="w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_15px_white]" style={{ backgroundColor: data.color }}></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">Career Track Specialization</span>
              </div>
              <h1 className="text-6xl md:text-[96px] font-black text-white leading-[0.9] tracking-tighter">
                Master <br />
                <span style={{ color: data.color }}>{data.title}</span>
              </h1>
              <p className="text-slate-400 text-xl md:text-2xl leading-relaxed max-w-3xl font-medium opacity-80">
                {data.description}
              </p>

              <div className="flex flex-wrap gap-16 pt-10">
                <div className="space-y-2">
                  <div className="text-5xl font-black text-white tracking-tighter">{data.stats.students}</div>
                  <div className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em]">Active Learners</div>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl font-black text-white flex items-center space-x-3 tracking-tighter">
                    <span>{data.stats.rating}</span>
                    <Star className="w-8 h-8 text-orange-400 fill-orange-400" />
                  </div>
                  <div className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em]">Satisfaction Rate</div>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl font-black text-white tracking-tighter">{data.stats.courses}</div>
                  <div className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em]">Curated Modules</div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 w-full flex justify-center lg:justify-end">
               <div 
                 className="w-full max-w-[420px] aspect-square rounded-[100px] flex items-center justify-center relative overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.6)] group"
                 style={{ backgroundColor: data.color }}
               >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-700"></div>
                  <div className="relative z-10 p-24 bg-white/10 backdrop-blur-3xl rounded-[70px] border border-white/20 shadow-2xl transform group-hover:scale-110 transition-transform duration-700">
                    {React.cloneElement(data.icon, { className: "w-32 h-32 text-white" })}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-48 bg-white/[0.01] border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div className="space-y-16">
               <div className="space-y-6">
                 <h2 className="text-5xl font-black text-white tracking-tighter">The Learning Journey</h2>
                 <p className="text-slate-400 text-xl leading-relaxed font-medium opacity-70">
                   Our curriculum is designed by industry veterans to ensure you acquire the exact skills that top employers are looking for right now.
                 </p>
               </div>

               <div className="space-y-8">
                 {data.syllabus.map((step: any, idx: number) => (
                    <div key={idx} className="flex items-center space-x-8 p-10 bg-[#1a1c1e] rounded-[48px] border border-white/5 hover:border-white/10 transition-all group shadow-xl">
                       <div className="w-16 h-16 rounded-[24px] bg-white/5 flex items-center justify-center font-black text-2xl text-white border border-white/10 group-hover:bg-orange-500 transition-colors shadow-inner">
                         {idx + 1}
                       </div>
                       <div className="flex-grow">
                         <h4 className="text-2xl font-black text-white mb-2">{step.title}</h4>
                         <div className="flex items-center space-x-4 text-xs font-black text-slate-500 uppercase tracking-widest">
                           <Clock className="w-4 h-4" />
                           <span>{step.duration} Intensive</span>
                         </div>
                       </div>
                    </div>
                 ))}
               </div>
            </div>

            <div className="space-y-16">
               <div className="space-y-6">
                 <h2 className="text-5xl font-black text-white tracking-tighter">Career Outcomes</h2>
                 <p className="text-slate-400 text-xl leading-relaxed font-medium opacity-70">
                   Graduating from this path transforms your professional profile. Here is what you can expect upon completion.
                 </p>
               </div>
               
               <div className="grid grid-cols-1 gap-8">
                 {data.outcomes.map((outcome: string) => (
                    <div key={outcome} className="flex items-center space-x-6 p-12 bg-gradient-to-br from-white/5 to-transparent rounded-[56px] border border-white/5 shadow-2xl hover:-translate-y-2 transition-transform">
                       <div className="w-16 h-16 rounded-3xl bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                         <Award className="w-8 h-8 text-orange-500" />
                       </div>
                       <span className="text-white font-black text-2xl leading-tight tracking-tight">{outcome}</span>
                    </div>
                 ))}
               </div>

               <div className="bg-white/5 p-16 rounded-[64px] border border-white/5 text-center space-y-10 shadow-[0_40px_80px_rgba(0,0,0,0.3)]">
                  <div className="inline-flex p-5 bg-orange-500 rounded-3xl shadow-[0_15px_30px_rgba(245,158,11,0.3)]">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white tracking-tight">Accelerate Your Career</h3>
                  <p className="text-slate-400 font-medium text-lg leading-relaxed">Join 50,000+ professionals who have changed their lives through our specialization programs.</p>
                  <button className="orange-gradient text-white px-16 py-6 rounded-full font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all">
                    Apply for Admission
                  </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses for this category */}
      <section className="py-48">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
            <div className="max-w-3xl">
              <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-[11px] mb-5 block">Selected for your growth</span>
              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter">Curated Curriculum</h2>
              <p className="text-slate-400 text-xl font-medium mt-8 leading-relaxed opacity-70">Hand-picked modules that form the backbone of this specialization.</p>
            </div>
            <Link to="/courses" className="flex items-center space-x-4 text-slate-500 hover:text-white transition-colors font-bold group pb-2">
              <span className="uppercase text-[13px] tracking-[0.2em] font-black">Full Inventory</span>
              <div className="p-4 bg-white/5 rounded-full group-hover:bg-orange-500 transition-colors shadow-2xl border border-white/10">
                <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {filteredCourses.length > 0 ? (
              filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <div className="col-span-full py-20 bg-white/2 rounded-[48px] border border-dashed border-white/10 text-center">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No specialized courses found. Check general catalog.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryLanding;
