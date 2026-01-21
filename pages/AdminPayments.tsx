
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { MOCK_PAYMENTS } from '../constants';
import { Download, CreditCard, ChevronDown, CheckCircle2, XCircle, Clock, RotateCcw } from 'lucide-react';

const AdminPayments: React.FC<{ onExitAdmin: () => void }> = ({ onExitAdmin }) => {
  const [payments, setPayments] = useState(MOCK_PAYMENTS);

  const handleRefund = (id: string) => {
    if (confirm("Issue a full refund for this transaction? This action will notify the student.")) {
       setPayments(prev => prev.map(p => {
         if (p.id === id) return { ...p, status: 'Failed' as any };
         return p;
       }));
       alert("Refund processed successfully.");
    }
  };

  return (
    <AdminLayout onExitAdmin={onExitAdmin}>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Financial Suite</h1>
            <p className="text-slate-500">Audit transactions, manage payouts, and issue refunds.</p>
          </div>
          <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center space-x-3 hover:bg-slate-800 transition-all shadow-xl active:scale-95">
            <Download className="w-5 h-5 text-orange-500" />
            <span>Export CSV Ledger</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatMini label="Gross Revenue (Total)" value="$128,450" trend="+12.5%" color="green" />
          <StatMini label="Unsettled Balance" value="$4,200" trend="-2.1%" color="orange" />
          <StatMini label="Authorization Rate" value="98.2%" trend="+0.4%" color="blue" />
        </div>

        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-black text-slate-900">Recent Transaction History</h3>
            <button className="flex items-center space-x-2 text-xs font-black text-slate-500 uppercase tracking-widest hover:text-orange-500 transition-colors">
              <span>Filter Results</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">TXN ID</th>
                  <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Learner</th>
                  <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Channel</th>
                  <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                  <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Settlement</th>
                  <th className="px-8 py-5 text-right text-[11px] font-black text-slate-400 uppercase tracking-widest">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map(payment => (
                  <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6 font-black text-slate-900 text-sm tracking-tighter">{payment.transactionId}</td>
                    <td className="px-8 py-6">
                       <div className="text-slate-900 font-bold">{payment.studentName}</div>
                       <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.1em]">Ref: {payment.studentId}</div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center space-x-2 text-slate-600 font-bold">
                         <CreditCard className="w-4 h-4 text-slate-400" />
                         <span>{payment.method}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-slate-900 font-black">${payment.amount}</td>
                    <td className="px-8 py-6">
                       <div className="flex items-center justify-between group/cell">
                          <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                            payment.status === 'Success' ? 'bg-green-50 text-green-600' : 
                            payment.status === 'Pending' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                          }`}>
                            {payment.status === 'Success' ? <CheckCircle2 className="w-3 h-3" /> : 
                             payment.status === 'Pending' ? <Clock className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            <span>{payment.status}</span>
                          </div>
                          {payment.status === 'Success' && (
                            <button 
                              onClick={() => handleRefund(payment.id)}
                              className="opacity-0 group-hover/cell:opacity-100 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all flex items-center space-x-1"
                            >
                               <RotateCcw className="w-3 h-3" />
                               <span className="text-[8px] font-black uppercase">Refund</span>
                            </button>
                          )}
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right text-slate-500 font-bold">{payment.date}</td>
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

const StatMini = ({ label, value, trend, color }: any) => (
  <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-default">
    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{label}</div>
    <div className="flex items-end justify-between">
      <div className="text-3xl font-black text-slate-900 tracking-tight">{value}</div>
      <div className={`text-[10px] font-black px-3 py-1.5 rounded-xl ${color === 'green' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>{trend}</div>
    </div>
  </div>
);

export default AdminPayments;
