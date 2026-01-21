import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut, 
  ShieldCheck,
  Bell,
  ChevronRight
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  onExitAdmin: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, onExitAdmin }) => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: BookOpen, label: 'Courses', path: '/admin/courses' },
    { icon: Users, label: 'Students', path: '/admin/students' },
    { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f1f3f5]">
      {/* Sidebar */}
      <aside className="w-80 bg-[#1a1c1e] text-white hidden md:flex flex-col fixed inset-y-0 shadow-2xl z-50">
        <div className="p-10 border-b border-white/5">
          <Link to="/" className="flex items-center space-x-4">
            <div className="w-12 h-12 orange-gradient rounded-[18px] flex items-center justify-center shadow-[0_10px_20px_rgba(245,158,11,0.3)]">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight block leading-none">ADMIN PANEL</span>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Management Suite</span>
            </div>
          </Link>
          <div className="mt-10 flex items-center space-x-4 bg-white/5 p-4 rounded-3xl border border-white/5 group hover:bg-white/10 transition-all cursor-pointer">
             <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center text-xs font-black shadow-lg">SA</div>
             <div className="flex-grow">
               <div className="text-[13px] font-black uppercase tracking-tight">Super Admin</div>
               <div className="text-[10px] text-slate-500 font-bold">Dipto Islam</div>
             </div>
             <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
          </div>
        </div>

        <nav className="flex-grow p-8 space-y-3 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center space-x-5 p-4 rounded-2xl transition-all group ${
                location.pathname === item.path 
                ? 'bg-orange-500 text-white shadow-[0_15px_30px_rgba(245,158,11,0.3)]' 
                : 'text-slate-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'text-white' : 'text-slate-600 group-hover:text-orange-500'}`} />
              <span className="font-black text-sm tracking-tight">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-10 border-t border-white/5">
          <button 
            onClick={onExitAdmin}
            className="flex items-center space-x-5 w-full p-4 text-slate-500 hover:text-red-400 hover:bg-red-400/5 rounded-2xl transition-all font-black text-sm uppercase tracking-widest"
          >
            <LogOut className="w-5 h-5" />
            <span>Exit Suite</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-grow md:ml-80 flex flex-col">
        {/* Top bar */}
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-200 px-10 flex items-center justify-between sticky top-0 z-40">
           <div className="flex items-center space-x-3">
             <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Admin /</span>
             <span className="text-slate-900 font-black text-lg capitalize tracking-tight">
                {location.pathname.split('/').pop() || 'Dashboard'}
             </span>
           </div>
           <div className="flex items-center space-x-8">
              <button className="p-3.5 bg-slate-50 rounded-2xl text-slate-400 hover:text-orange-500 transition-all relative group">
                <Bell className="w-5 h-5 group-hover:rotate-12" />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-orange-500 rounded-full border-[3px] border-white"></span>
              </button>
              <div className="w-[1px] h-10 bg-slate-200"></div>
              <div className="text-right hidden sm:block">
                 <div className="text-sm font-black text-slate-900 tracking-tight leading-none">Dipto Islam</div>
                 <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">Server Status: Online</div>
              </div>
           </div>
        </header>

        {/* Dynamic Content */}
        <main className="p-10 bg-[#f8f9fa]">
           <div className="max-w-[1500px] mx-auto">
              {children}
           </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;