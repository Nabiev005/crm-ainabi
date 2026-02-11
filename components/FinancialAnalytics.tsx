
import React from 'react';
import { CreditCard, ArrowUpCircle, ArrowDownCircle, Download, Wallet, PiggyBank } from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Student, PaymentStatus } from '../types';

// Added t: any to fix TypeScript error in App.tsx
interface FinancialProps {
  students: Student[];
  t: any;
}

const FinancialAnalytics: React.FC<FinancialProps> = ({ students, t }) => {
  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#8b5cf6'];
  
  const incomeData = [
    { category: 'Курстар', value: 450000 },
    { category: 'Жеке сабактар', value: 80000 },
    { category: 'Корпоративдик', value: 120000 },
    { category: 'Башка', value: 30000 },
  ];

  const pendingPayments = students.filter(s => s.paymentStatus !== PaymentStatus.PAID);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-600/20 flex flex-col justify-between h-48">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-white/20 rounded-lg"><Wallet className="w-6 h-6" /></div>
            <button className="text-white/60 hover:text-white"><Download className="w-5 h-5" /></button>
          </div>
          <div>
            <p className="text-indigo-100 text-sm font-medium">Жалпы баланс</p>
            <h3 className="text-3xl font-black mt-1">1,420,000 сом</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between h-48">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-50 rounded-lg text-green-600"><ArrowUpCircle className="w-6 h-6" /></div>
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Акыркы айдагы киреше</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">680,000 сом</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between h-48">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-red-50 rounded-lg text-red-600"><ArrowDownCircle className="w-6 h-6" /></div>
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Күтүлүүдө</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              {(pendingPayments.length * 15000).toLocaleString()} сом
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-8 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-indigo-600" />
            Киреше булактары
          </h3>
          <div className="h-[300px] flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={incomeData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {incomeData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-8 flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-indigo-600" />
            Төлөмү жок студенттер ({pendingPayments.length})
          </h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {pendingPayments.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center font-bold text-indigo-600 uppercase">
                    {student.firstName[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{student.firstName} {student.lastName}</h4>
                    <p className="text-xs text-slate-500">{student.courses[0]}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900">15,000 сом</div>
                  <div className="text-[10px] font-bold text-red-500 uppercase">{student.paymentStatus}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalytics;
