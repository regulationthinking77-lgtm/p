
import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { Course } from '../types';
import { TrendingUp, Users, BookOpen, DollarSign, ArrowUpRight, ChevronRight, Star, AlertTriangle, ExternalLink } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface AdminDashboardProps {
  courses: Course[];
  onExitAdmin: () => void;
  dbError?: string | null;
}

const mockChartData = [
  { name: 'Mon', revenue: 4200, students: 2400 },
  { name: 'Tue', revenue: 3800, students: 1398 },
  { name: 'Wed', revenue: 5100, students: 3800 },
  { name: 'Thu', revenue: 4900, students: 3908 },
  { name: 'Fri', revenue: 6200, students: 4800 },
  { name: 'Sat', revenue: 7500, students: 3800 },
  { name: 'Sun', revenue: 6800, students: 4300 },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ courses, onExitAdmin, dbError }) => {
  const totalRevenue = courses.reduce((acc, c) => acc + (c.price * c.students), 0);
  const totalStudents = courses.reduce((acc, c) => acc + c.students, 0);

  return (
    <AdminLayout onExitAdmin={onExitAdmin}>
      <div className="space-y-12 pb-16">
        {/* API Disabled Warning Banner */}
        {dbError && (
          <div className="bg-orange-50 border border-orange-200 p-8 rounded-[40px] flex flex-col md:flex-row items-center gap-8 shadow-sm">
            <div className="w-16 h-16 bg-orange-100 rounded-3xl flex items-center justify-center text-orange-600 flex-shrink-0">
               <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="flex-grow space-y-2">
               <h3 className="text-xl font-black text-slate-900">Firestore API is Disabled</h3>
               <p className="text-slate-600 font-medium">Your Firebase project is missing the Cloud Firestore API. Changes you make here will not be saved to the database. To fix this, enable the API in the Google Cloud Console.</p>
            </div>
            <a 
              href="https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=asdd-cf873" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center space-x-2 hover:bg-orange-700 transition-all active:scale-95 shadow-lg whitespace-nowrap"
            >
              <span>Enable API Now</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Performance Hub</h1>
            <p className="text-slate-500 font-medium">Real-time platform metrics and analytics.</p>
          </div>
          <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center space-x-3 hover:bg-slate-800 transition-all shadow-xl active:scale-95">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <span>Detailed Analytics</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard icon={<DollarSign className="w-6 h-6" />} label="Gross Volume" value={`$${(totalRevenue/1000).toFixed(1)}k`} trend="+14.2%" color="orange" />
          <StatCard icon={<Users className="w-6 h-6" />} label="New Learners" value={totalStudents.toLocaleString()} trend="+8.4%" color="slate" />
          <StatCard icon={<BookOpen className="w-6 h-6" />} label="Active Content" value={courses.length.toString()} trend="+2" color="slate" />
          <StatCard icon={<TrendingUp className="w-6 h-6" />} label="Retention Rate" value="94.2%" trend="+1.2%" color="orange" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <div>
                 <h3 className="text-2xl font-black text-slate-900 tracking-tight">Revenue Stream</h3>
                 <p className="text-slate-500 text-sm font-medium">Weekly transaction distribution</p>
               </div>
               <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                     <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                     <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Revenue</span>
                  </div>
               </div>
            </div>
            <div className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 'bold' }} 
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#f59e0b" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm flex flex-col">
            <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Course Reach</h3>
            <p className="text-slate-500 text-sm font-medium mb-10">Student enrollment volume</p>
            <div className="flex-grow h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData}>
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', fontWeight: 'bold' }} 
                  />
                  <Bar dataKey="students" fill="#3D3F4A" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Performing Courses */}
        <div className="bg-white rounded-[48px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-10 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Top Performing Courses</h3>
            <button className="flex items-center space-x-2 text-orange-500 font-black text-xs uppercase tracking-[0.2em] hover:text-orange-600 transition-all">
               <span>Full Inventory</span>
               <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50 text-slate-400 text-[11px] font-black uppercase tracking-widest">
                <tr>
                  <th className="px-10 py-6 text-left">Catalogue Item</th>
                  <th className="px-10 py-6 text-left">Category</th>
                  <th className="px-10 py-6 text-left">Volume</th>
                  <th className="px-10 py-6 text-left">Enrollments</th>
                  <th className="px-10 py-6 text-right">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.slice(0, 5).map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50/80 transition-all cursor-pointer group">
                    <td className="px-10 py-7">
                      <div className="flex items-center space-x-5">
                        <img src={course.image} className="w-14 h-14 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform" />
                        <span className="font-black text-slate-900 tracking-tight">{course.title}</span>
                      </div>
                    </td>
                    <td className="px-10 py-7">
                       <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                         {course.category}
                       </span>
                    </td>
                    <td className="px-10 py-7 font-black text-slate-900">${(course.price * course.students).toLocaleString()}</td>
                    <td className="px-10 py-7 text-slate-500 font-bold">{course.students.toLocaleString()}</td>
                    <td className="px-10 py-7 text-right">
                      <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-black">
                        <span>{course.rating}</span>
                        <Star className="w-3 h-3 fill-green-700" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const StatCard = ({ icon, label, value, trend, color }: { icon: React.ReactNode, label: string, value: string, trend: string, color: string }) => {
  const colors: Record<string, string> = {
    orange: 'bg-orange-50 text-orange-500',
    slate: 'bg-slate-100 text-slate-900',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600'
  };

  return (
    <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm flex flex-col space-y-6 hover:shadow-xl transition-all group">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors[color]} group-hover:scale-110 transition-transform shadow-sm`}>
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <h4 className="text-4xl font-black text-slate-900 tracking-tight mb-2">{value}</h4>
        <div className="flex items-center space-x-2 text-[10px] font-black text-green-600 uppercase tracking-widest">
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>{trend} / Mo</span>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
