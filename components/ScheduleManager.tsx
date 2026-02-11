import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, User, Plus, Trash2, Filter, X, Search } from 'lucide-react';
import { Schedule } from '../types';

interface ScheduleManagerProps {
  t: any;
  isDarkMode: boolean;
}

const ScheduleManager: React.FC<ScheduleManagerProps> = ({ t, isDarkMode }) => {
  const [schedules, setSchedules] = useState<Schedule[]>(() => {
    const saved = localStorage.getItem('crm_schedule');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterDay, setFilterDay] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [newEntry, setNewEntry] = useState({
    courseTitle: '',
    instructor: '',
    day: 'Monday',
    time: '',
    room: ''
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getDayTranslation = (day: string) => {
    const map: any = {
      'Monday': 'Дүйшөмбү', 'Tuesday': 'Шейшемби', 'Wednesday': 'Шаршемби',
      'Thursday': 'Бейшемби', 'Friday': 'Жума', 'Saturday': 'Ишемби', 'Sunday': 'Жекшемби'
    };
    return map[day] || day;
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: Schedule = {
      id: 's' + Date.now(),
      courseId: 'custom',
      ...newEntry
    };
    const updated = [...schedules, entry];
    setSchedules(updated);
    localStorage.setItem('crm_schedule', JSON.stringify(updated));
    setIsModalOpen(false);
    setNewEntry({ courseTitle: '', instructor: '', day: 'Monday', time: '', room: '' });
  };

  const deleteEntry = (id: string) => {
    if(window.confirm("Бул сабакты өчүрүүнү каалайсызбы?")) {
      const updated = schedules.filter(s => s.id !== id);
      setSchedules(updated);
      localStorage.setItem('crm_schedule', JSON.stringify(updated));
    }
  };

  // Фильтрация жана Сортировка
  const filteredSchedule = useMemo(() => {
    return schedules
      .filter(s => (filterDay === 'All' || s.day === filterDay))
      .filter(s => s.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
                   s.instructor.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        const dayOrder = days.indexOf(a.day) - days.indexOf(b.day);
        if (dayOrder !== 0) return dayOrder;
        return a.time.localeCompare(b.time); // Убакыт боюнча сорттоо
      });
  }, [schedules, filterDay, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20">
      
      {/* Header & Controls */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h2 className={`text-2xl md:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {t.schedule || 'Жадыбал'}
          </h2>
          <p className="text-slate-500 text-sm mt-1">Окуу борборунун иш графиги жана аудиториялар</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Издөө (курс же мугалим)..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white focus:border-indigo-500' : 'bg-white border-slate-200 focus:border-indigo-400'
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter */}
          <div className="relative w-full sm:w-auto">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500" />
            <select 
              className={`w-full sm:w-auto pl-10 pr-8 py-2.5 rounded-xl border appearance-none font-bold text-sm outline-none cursor-pointer ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
              }`}
              value={filterDay}
              onChange={(e) => setFilterDay(e.target.value)}
            >
              <option value="All">Бардык күндөр</option>
              {days.map(d => <option key={d} value={d}>{getDayTranslation(d)}</option>)}
            </select>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-600/20"
          >
            <Plus className="w-5 h-5" />
            Сабак кошуу
          </button>
        </div>
      </div>

      {/* Schedule Cards Grid */}
      {filteredSchedule.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {filteredSchedule.map((item) => (
            <div 
              key={item.id} 
              className={`group p-5 rounded-3xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden ${
                isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/50' : 'bg-white border-slate-200 hover:border-indigo-200'
              }`}
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500" />
              
              <div className="flex items-center justify-between mb-5 relative z-10">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  isDarkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  {getDayTranslation(item.day)}
                </span>
                <button 
                  onClick={() => deleteEntry(item.id)}
                  className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <h3 className={`text-lg font-black mb-4 line-clamp-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {item.courseTitle}
              </h3>
              
              <div className="space-y-3.5 relative z-10">
                <div className={`flex items-center gap-3 p-2 rounded-xl ${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                  <div className="p-1.5 bg-white dark:bg-slate-700 rounded-lg shadow-sm">
                    <Clock className="w-4 h-4 text-indigo-500" />
                  </div>
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{item.time}</span>
                </div>
                
                <div className="flex items-center gap-3 px-2">
                  <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-sm text-slate-500 font-medium truncate">{item.room}</span>
                </div>
                
                <div className="flex items-center gap-3 px-2">
                  <User className="w-4 h-4 text-orange-400 shrink-0" />
                  <span className="text-sm text-slate-500 font-medium truncate">{item.instructor}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className={`flex flex-col items-center justify-center py-20 rounded-[3rem] border-2 border-dashed ${
          isDarkMode ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-slate-50/50'
        }`}>
          <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <CalendarIcon className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">Сабак табылган жок</h3>
          <p className="text-slate-500 text-sm max-w-xs text-center mt-2">
            Тандалган күнгө же издөөгө ылайык сабактар жок. Жаңы сабак кошуп көрүңүз.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-6 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all"
          >
            Биринчи сабакты кошуу
          </button>
        </div>
      )}

      {/* Modal - Сиздин кодуңуздагы Modal сакталып калды, стилдери бир аз жакшыртылды */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
           {/* ... (Modal content) ... */}
           {/* Кодду компакттуу кармоо үчүн бул жерге сиздин Modal логикаңыз кирет */}
           <div className={`rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white'}`}>
            <div className={`p-8 border-b flex items-center justify-between ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50/50 border-slate-200'}`}>
              <div>
                <h3 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Сабак кошуу</h3>
                <p className="text-xs text-slate-500 mt-1">Бардык талааларды толтуруңуз</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 rounded-full transition-all">
                <X className="w-6 h-6"/>
              </button>
            </div>
            <form onSubmit={handleAddEntry} className="p-8 space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Курстун аталышы</label>
                <input required placeholder="Мис: Python Backend" className={`w-full p-4 border rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                  value={newEntry.courseTitle} onChange={e => setNewEntry({...newEntry, courseTitle: e.target.value})} />
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Окутуучунун аты</label>
                <input required placeholder="Аты-жөнү" className={`w-full p-4 border rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                  value={newEntry.instructor} onChange={e => setNewEntry({...newEntry, instructor: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Күнү</label>
                  <select className={`w-full p-4 border rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                    value={newEntry.day} onChange={e => setNewEntry({...newEntry, day: e.target.value})}>
                    {days.map(d => <option key={d} value={d}>{getDayTranslation(d)}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Убактысы</label>
                  <input required placeholder="09:00 - 11:00" className={`w-full p-4 border rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                    value={newEntry.time} onChange={e => setNewEntry({...newEntry, time: e.target.value})} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Аудитория</label>
                <input required placeholder="Мис: 3-каана же IT-LAB" className={`w-full p-4 border rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                  value={newEntry.room} onChange={e => setNewEntry({...newEntry, room: e.target.value})} />
              </div>

              <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-1 active:translate-y-0 transition-all mt-4">
                Сабакты жарыялоо
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleManager;