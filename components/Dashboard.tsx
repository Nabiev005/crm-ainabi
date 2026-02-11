import React from 'react';
import { 
  Users, TrendingUp, Award, Clock, ArrowUpRight, 
  ArrowDownRight, Calendar, Zap 
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { Student, Course } from '../types';

const data = [
  { name: 'Jan', students: 400, revenue: 2400 },
  { name: 'Feb', students: 300, revenue: 1398 },
  { name: 'Mar', students: 600, revenue: 9800 },
  { name: 'Apr', students: 800, revenue: 3908 },
  { name: 'May', students: 500, revenue: 4800 },
  { name: 'Jun', students: 700, revenue: 3800 },
];

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md flex flex-col justify-between">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2.5 md:p-3 rounded-xl ${color} bg-opacity-10 dark:bg-opacity-20`}>
        <Icon className={`w-5 h-5 md:w-6 md:h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      {trend !== undefined && (
        <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-lg ${trend > 0 ? 'bg-green-50 text-green-600 dark:bg-green-500/10' : 'bg-red-50 text-red-600 dark:bg-red-500/10'}`}>
          {trend > 0 ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div>
      <h3 className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-medium truncate">{title}</h3>
      <div className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</div>
    </div>
  </div>
);

interface DashboardProps {
  students: Student[];
  courses: Course[];
  t: any;
}

const Dashboard: React.FC<DashboardProps> = ({ students, courses, t }) => {
  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight dark:text-white">Кош келиңиз! 👋</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm italic">Борбордун бүгүнкү көрсөткүчтөрү</p>
        </div>
        <button className="w-full sm:w-auto px-5 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all">
          <Zap className="w-4 h-4 fill-white" />
          AI Аналитика
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard title={t.totalStudents} value={students.length.toLocaleString()} icon={Users} color="bg-indigo-600" trend={12.5} />
        <StatCard title={t.monthlyIncome} value={`482,000 ${t.som}`} icon={TrendingUp} color="bg-emerald-600" trend={8.2} />
        <StatCard title={t.activeCourses} value={courses.length} icon={Award} color="bg-orange-600" />
        <StatCard title={t.graduates} value="342" icon={Clock} color="bg-purple-600" trend={15.0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <h3 className="font-bold text-slate-800 dark:text-white mb-6 text-base md:text-lg">{t.enrollmentStats}</h3>
          <div className="h-[250px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-slate-800" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    backgroundColor: '#1e293b',
                    color: '#fff',
                    fontSize: '12px'
                  }} 
                />
                <Area type="monotone" dataKey="students" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Schedule Sidebar */}
        <div className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full">
          <h3 className="font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2 text-base md:text-lg">
            <Calendar className="w-5 h-5 text-indigo-600" />
            {t.todayClasses}
          </h3>
          <div className="space-y-4 flex-1 overflow-y-auto pr-1 min-h-[200px]">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-transparent hover:border-indigo-200 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase">18:00 - 20:00</span>
                <span className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded text-[9px] font-bold border border-slate-200 dark:border-slate-600">302</span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Frontend React</h4>
              <p className="text-xs text-slate-500 mt-1">Элдар Алымкулов</p>
            </div>
            {/* Completed class example */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/20 rounded-xl border border-transparent opacity-60">
              <div className="flex justify-between items-start mb-2 text-slate-400">
                <span className="text-[10px] font-black uppercase">10:00 - 12:00</span>
                <span className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded text-[9px] font-bold border border-slate-200 dark:border-slate-600">Lab 1</span>
              </div>
              <h4 className="font-bold text-slate-600 dark:text-slate-400 text-sm line-through">UI/UX Design</h4>
              <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-tighter">Аяктады</p>
            </div>
          </div>
          <button className="mt-4 w-full py-2.5 text-[10px] font-black text-slate-400 hover:text-indigo-600 transition-all uppercase tracking-widest border-t border-slate-100 dark:border-slate-800 pt-4">
            Баары
          </button>
        </div>
      </div>

      {/* Recent Students Section */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <h3 className="font-bold text-slate-800 dark:text-white mb-6 text-base md:text-lg">{t.recentEnrolled}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.slice(0, 6).map((student) => (
            <div key={student.id} className="group flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/30 rounded-2xl hover:bg-white dark:hover:bg-indigo-900/40 hover:shadow-sm border border-transparent hover:border-slate-100 dark:hover:border-indigo-900/50 transition-all">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400 uppercase text-sm md:text-base shrink-0 group-hover:scale-105 transition-transform">
                {student.firstName[0]}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{student.firstName} {student.lastName}</div>
                <div className="text-[9px] md:text-[10px] text-indigo-500 font-black uppercase tracking-tight truncate">{student.courses[0]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;