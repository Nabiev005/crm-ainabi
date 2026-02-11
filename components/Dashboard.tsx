
import React from 'react';
import { 
  Users, 
  TrendingUp, 
  Award, 
  Clock, 
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Zap
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
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
  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 dark:bg-opacity-20`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</h3>
    <div className="flex items-end gap-3 mt-1">
      <span className="text-2xl font-bold text-slate-900 dark:text-white">{value}</span>
      {trend !== undefined && (
        <span className={`flex items-center text-xs font-semibold ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend > 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {Math.abs(trend)}%
        </span>
      )}
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight dark:text-white">Кош келиңиз! 👋</h2>
          <p className="text-slate-500 text-sm">Бүгүнкү күнгө карата борборуңуздун көрсөткүчтөрү</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-bold border border-indigo-100 dark:border-indigo-900/50 flex items-center gap-2">
             <Zap className="w-3 h-3" />
             AI Аналитика
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title={t.totalStudents} value={students.length.toLocaleString()} icon={Users} color="bg-indigo-600" trend={12.5} />
        <StatCard title={t.monthlyIncome} value={`482,000 ${t.som}`} icon={TrendingUp} color="bg-emerald-600" trend={8.2} />
        <StatCard title={t.activeCourses} value={courses.length} icon={Award} color="bg-orange-600" />
        <StatCard title={t.graduates} value="342" icon={Clock} color="bg-purple-600" trend={15.0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 dark:text-white">{t.enrollmentStats}</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-slate-800" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    backgroundColor: '#1e293b',
                    color: '#fff'
                  }} 
                />
                <Area type="monotone" dataKey="students" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors flex flex-col">
          <h3 className="font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" />
            {t.todayClasses}
          </h3>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 max-h-[300px]">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-transparent hover:border-indigo-300 dark:hover:border-indigo-900 transition-all cursor-default">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">18:00 - 20:00</span>
                <span className="px-2 py-0.5 bg-white dark:bg-slate-800 rounded text-[10px] font-bold border border-slate-200 dark:border-slate-700">Каана 302</span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Frontend React</h4>
              <p className="text-xs text-slate-500 mt-1">Окутуучу: Элдар Алымкулов</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-transparent hover:border-indigo-300 dark:hover:border-indigo-900 transition-all cursor-default opacity-60">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase">10:00 - 12:00</span>
                <span className="px-2 py-0.5 bg-white dark:bg-slate-800 rounded text-[10px] font-bold border border-slate-200 dark:border-slate-700">Lab 1</span>
              </div>
              <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm line-through">UI/UX Design</h4>
              <p className="text-xs text-slate-500 mt-1">Аяктады</p>
            </div>
          </div>
          <button className="mt-6 w-full py-2.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest border-t border-slate-100 dark:border-slate-800">
            Бардык жадыбал
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <h3 className="font-bold text-slate-800 dark:text-white mb-6">{t.recentEnrolled}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.slice(0, 6).map((student) => (
            <div key={student.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/30 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                {student.firstName[0]}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-slate-100">{student.firstName} {student.lastName}</div>
                <div className="text-[10px] text-indigo-500 font-bold uppercase">{student.courses[0]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
