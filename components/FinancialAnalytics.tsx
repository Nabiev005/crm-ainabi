import React from 'react';
import { CreditCard, ArrowUpCircle, ArrowDownCircle, Download, Wallet, PiggyBank } from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Student, PaymentStatus } from '../types';

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
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-10 px-1 md:px-0">
      
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {/* Main Balance Card */}
        <div className="bg-indigo-600 p-5 md:p-6 rounded-3xl text-white shadow-xl shadow-indigo-600/20 flex flex-col justify-between min-h-[140px] md:h-48 col-span-1 sm:col-span-2 md:col-span-1">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-white/20 rounded-lg"><Wallet className="w-5 h-5 md:w-6 md:h-6" /></div>
            <button className="text-white/60 hover:text-white transition-colors"><Download className="w-5 h-5" /></button>
          </div>
          <div>
            <p className="text-indigo-100 text-xs md:text-sm font-medium">Жалпы баланс</p>
            <h3 className="text-2xl md:text-3xl font-black mt-1">1,420,000 сом</h3>
          </div>
        </div>

        {/* Income Card */}
        <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between min-h-[140px] md:h-48">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-50 rounded-lg text-green-600"><ArrowUpCircle className="w-5 h-5 md:w-6 md:h-6" /></div>
          </div>
          <div>
            <p className="text-slate-500 text-xs md:text-sm font-medium">Акыркы айдагы киреше</p>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">680,000 сом</h3>
          </div>
        </div>

        {/* Pending Card */}
        <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between min-h-[140px] md:h-48">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-red-50 rounded-lg text-red-600"><ArrowDownCircle className="w-5 h-5 md:w-6 md:h-6" /></div>
          </div>
          <div>
            <p className="text-slate-500 text-xs md:text-sm font-medium">Күтүлүүдө</p>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
              {(pendingPayments.length * 15000).toLocaleString()} сом
            </h3>
          </div>
        </div>
      </div>

      {/* Analytics & Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        
        {/* Income Sources Chart */}
        <div className="bg-white p-5 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 md:mb-8 flex items-center gap-2 text-base md:text-lg">
            <CreditCard className="w-5 h-5 text-indigo-600" />
            Киреше булактары
          </h3>
          <div className="h-[250px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={incomeData} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="60%" 
                  outerRadius="90%" 
                  paddingAngle={5} 
                  dataKey="value"
                  nameKey="category"
                >
                  {incomeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend verticalAlign="bottom" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Unpaid Students List */}
        <div className="bg-white p-5 md:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 mb-6 md:mb-8 flex items-center gap-2 text-base md:text-lg">
            <PiggyBank className="w-5 h-5 text-indigo-600" />
            Төлөмү жок студенттер
            <span className="ml-auto bg-red-50 text-red-600 text-xs px-2 py-1 rounded-full">{pendingPayments.length}</span>
          </h3>
          <div className="space-y-3 flex-1 overflow-y-auto pr-1 max-h-[350px] md:max-h-[400px]">
            {pendingPayments.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 md:p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50/50 transition-all border border-transparent hover:border-indigo-100">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center font-bold text-indigo-600 uppercase shrink-0">
                    {student.firstName[0]}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 truncate">{student.firstName} {student.lastName}</h4>
                    <p className="text-[10px] md:text-xs text-slate-500 truncate">{student.courses[0]}</p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <div className="text-sm font-bold text-slate-900">15,000 сом</div>
                  <div className={`text-[9px] font-black uppercase ${student.paymentStatus === 'Unpaid' ? 'text-red-500' : 'text-orange-500'}`}>
                    {student.paymentStatus}
                  </div>
                </div>
              </div>
            ))}
            {pendingPayments.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-sm italic">Бардык төлөмдөр кабыл алынды ✨</div>
            )}
          </div>
          <button className="mt-4 w-full py-3 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
            Эскертүү жөнөтүү (SMS)
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalytics;