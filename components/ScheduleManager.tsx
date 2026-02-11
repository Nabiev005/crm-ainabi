
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, User, Plus, Trash2, Filter, X } from 'lucide-react';
import { Schedule } from '../types';
import { INITIAL_SCHEDULE } from './constants';

interface ScheduleManagerProps {
  t: any;
  isDarkMode: boolean;
}

const ScheduleManager: React.FC<ScheduleManagerProps> = ({ t, isDarkMode }) => {
  const [schedules, setSchedules] = useState<Schedule[]>(() => {
    const saved = localStorage.getItem('crm_schedule');
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULE;
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterDay, setFilterDay] = useState<string>('All');
  
  const [newEntry, setNewEntry] = useState({
    courseTitle: '',
    instructor: '',
    day: 'Monday',
    time: '',
    room: ''
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
    const updated = schedules.filter(s => s.id !== id);
    setSchedules(updated);
    localStorage.setItem('crm_schedule', JSON.stringify(updated));
  };

  const filteredSchedule = filterDay === 'All' 
    ? schedules 
    : schedules.filter(s => s.day === filterDay);

  const getDayTranslation = (day: string) => {
    const map: any = {
      'Monday': { ky: 'Дүйшөмбү', en: 'Monday', ru: 'Понедельник' },
      'Tuesday': { ky: 'Шейшемби', en: 'Tuesday', ru: 'Вторник' },
      'Wednesday': { ky: 'Шаршемби', en: 'Wednesday', ru: 'Среда' },
      'Thursday': { ky: 'Бейшемби', en: 'Thursday', ru: 'Четверг' },
      'Friday': { ky: 'Жума', en: 'Friday', ru: 'Пятница' },
      'Saturday': { ky: 'Ишемби', en: 'Saturday', ru: 'Суббота' },
      'Sunday': { ky: 'Жекшемби', en: 'Sunday', ru: 'Воскресенье' }
    };
    return map[day]?.[t.language || 'ky'] || day;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t.schedule}</h2>
          <p className="text-slate-500">Окуу борборунун сабактар жадыбалы</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Filter className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
            <select 
              className={`pl-10 pr-4 py-2.5 rounded-xl border appearance-none outline-none transition-all ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-700'
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
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            Кошуу
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchedule.sort((a,b) => days.indexOf(a.day) - days.indexOf(b.day)).map((item) => (
          <div 
            key={item.id} 
            className={`group p-6 rounded-2xl border transition-all hover:shadow-xl hover:-translate-y-1 ${
              isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/50' : 'bg-white border-slate-200 hover:border-indigo-300'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                isDarkMode ? 'bg-indigo-900/30 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
              }`}>
                {getDayTranslation(item.day)}
              </span>
              <button 
                onClick={() => deleteEntry(item.id)}
                className="p-1.5 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.courseTitle}</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span className="font-medium">{item.time}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span className="font-medium">{item.room}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <User className="w-4 h-4 text-orange-500" />
                <span className="font-medium">{item.instructor}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className={`rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white'}`}>
            <div className={`p-6 border-b flex items-center justify-between ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Сабак кошуу</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleAddEntry} className="p-6 space-y-4">
              <input 
                required placeholder="Курстун аталышы" 
                className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50'}`}
                value={newEntry.courseTitle} 
                onChange={e => setNewEntry({...newEntry, courseTitle: e.target.value})} 
              />
              <input 
                required placeholder="Окутуучу" 
                className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50'}`}
                value={newEntry.instructor} 
                onChange={e => setNewEntry({...newEntry, instructor: e.target.value})} 
              />
              <div className="grid grid-cols-2 gap-4">
                <select 
                  className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50'}`}
                  value={newEntry.day}
                  onChange={e => setNewEntry({...newEntry, day: e.target.value})}
                >
                  {days.map(d => <option key={d} value={d}>{getDayTranslation(d)}</option>)}
                </select>
                <input 
                  required placeholder="18:00 - 20:00" 
                  className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50'}`}
                  value={newEntry.time} 
                  onChange={e => setNewEntry({...newEntry, time: e.target.value})} 
                />
              </div>
              <input 
                required placeholder="Каана (мис: 204-бөлмө)" 
                className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50'}`}
                value={newEntry.room} 
                onChange={e => setNewEntry({...newEntry, room: e.target.value})} 
              />
              <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold mt-4 shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all">
                Сактоо
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleManager;
