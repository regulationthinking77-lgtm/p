
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { MOCK_STUDENTS } from '../constants';
import { Search, UserPlus, Mail, MoreVertical, ShieldCheck, ShieldAlert, Trash2, CheckCircle } from 'lucide-react';

const AdminStudents: React.FC<{ onExitAdmin: () => void }> = ({ onExitAdmin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState(MOCK_STUDENTS);

  const handleDeleteStudent = (id: string) => {
    if (confirm("Remove this student from the platform? This cannot be undone.")) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return s;
    }));
  };

  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout onExitAdmin={onExitAdmin}>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Student Directory</h1>
            <p className="text-slate-500">Manage learner access and active enrollments.</p>
          </div>
          <button className="orange-gradient text-white px-8 py-4 rounded-2xl font-black flex items-center space-x-3 shadow-xl hover:scale-105 transition-all">
            <UserPlus className="w-5 h-5" />
            <span>Enroll Manually</span>
          </button>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
           <div className="relative flex-grow">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
             <input 
               type="text" 
               placeholder="Search by name, email or ID..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500/20 text-slate-900 font-medium"
             />
           </div>
           <select className="bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-600 font-bold min-w-[180px]">
             <option>All Students</option>
             <option>Active Only</option>
             <option>Suspended Only</option>
           </select>
        </div>

        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Student Identity</th>
                  <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Modules</th>
                  <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Enrollment Date</th>
                  <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Account Status</th>
                  <th className="px-8 py-5 text-right text-[11px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(student => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400 group-hover:bg-orange-500 group-hover:text-white transition-all uppercase shadow-inner">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-slate-900 font-black">{student.name}</div>
                          <div className="text-slate-500 text-xs flex items-center space-x-1">
                            <Mail className="w-3 h-3" />
                            <span>{student.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-wrap gap-2">
                        {student.enrolledCourses.map(id => (
                          <span key={id} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-tight">CID-{id}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-slate-500 font-bold">{student.joinDate}</td>
                    <td className="px-8 py-6">
                       <button 
                        onClick={() => handleToggleStatus(student.id)}
                        className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all shadow-sm ${student.status === 'Active' ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
                       >
                         {student.status === 'Active' ? <ShieldCheck className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                         <span>{student.status}</span>
                       </button>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex items-center justify-end space-x-2">
                          <button className="p-3 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all">
                             <CheckCircle className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteStudent(student.id)}
                            className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          >
                             <Trash2 className="w-4 h-4" />
                          </button>
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

export default AdminStudents;
