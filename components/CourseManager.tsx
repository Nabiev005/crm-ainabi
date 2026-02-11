import React, { useState } from 'react';
import { BookOpen, Users, Clock, Trash2, GraduationCap, X, Plus } from 'lucide-react';
import { Course } from '../types';

interface CourseManagerProps {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  t: any;
}

const CourseManager: React.FC<CourseManagerProps> = ({ courses, setCourses, t }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    instructor: '',
    duration: '',
    price: '',
    level: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced'
  });

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const course: Course = {
      id: 'c' + Date.now(),
      title: newCourse.title,
      instructor: newCourse.instructor,
      duration: newCourse.duration,
      price: Number(newCourse.price),
      studentsCount: 0,
      level: newCourse.level
    };
    setCourses(prev => [course, ...prev]);
    setIsModalOpen(false);
    setNewCourse({ title: '', instructor: '', duration: '', price: '', level: 'Beginner' });
  };

  const deleteCourse = (id: string) => {
    if (confirm('Курсту өчүрөсүзбү?')) {
      setCourses(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 px-2 md:px-0">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">Курстарды башкаруу</h2>
          <p className="text-xs md:text-sm text-slate-500">Жалпы {courses.length} программа</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span className="inline">Курс кошуу</span>
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all group flex flex-col">
            <div className="h-32 md:h-40 bg-slate-100 relative overflow-hidden shrink-0">
              <img 
                src={`https://picsum.photos/400/200?sig=${course.id}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                alt={course.title} 
              />
              <div className="absolute top-2 right-2 md:top-3 md:right-3">
                <button 
                  onClick={() => deleteCourse(course.id)} 
                  className="p-1.5 md:p-2 bg-white/90 backdrop-blur rounded-lg shadow-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4 md:p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-indigo-600 mb-2 uppercase tracking-wider">
                <GraduationCap className="w-3.5 h-3.5 md:w-4 h-4" />
                {course.level}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 line-clamp-1">{course.title}</h3>
              <p className="text-xs md:text-sm text-slate-500 mb-4 truncate">Окутуучу: <span className="text-slate-700 font-medium">{course.instructor}</span></p>
              
              <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 mt-auto text-[11px] md:text-sm text-slate-600 font-medium">
                <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 md:w-4 h-4 text-slate-400" />{course.duration}</div>
                <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 md:w-4 h-4 text-slate-400" />{course.studentsCount} студ.</div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                <div className="text-lg md:text-xl font-black text-slate-900">{course.price.toLocaleString()} сом</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 duration-300">
            <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-lg md:text-xl font-bold text-slate-800">Жаңы курс</h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500"/>
              </button>
            </div>
            
            <form onSubmit={handleAddCourse} className="p-4 md:p-6 space-y-3 md:space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 ml-1">Курстун аталышы</label>
                <input required placeholder="Мис: Frontend React" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm"
                  value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 ml-1">Окутуучу</label>
                  <input required placeholder="Аты-жөнү" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    value={newCourse.instructor} onChange={e => setNewCourse({...newCourse, instructor: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 ml-1">Узактыгы</label>
                  <input required placeholder="3 ай" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    value={newCourse.duration} onChange={e => setNewCourse({...newCourse, duration: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 ml-1">Баасы (сом)</label>
                  <input required type="number" placeholder="0" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    value={newCourse.price} onChange={e => setNewCourse({...newCourse, price: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 ml-1">Деңгээли</label>
                  <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" value={newCourse.level} 
                    onChange={e => setNewCourse({...newCourse, level: e.target.value as any})}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full py-3 md:py-4 bg-indigo-600 text-white rounded-xl md:rounded-2xl font-bold shadow-lg shadow-indigo-200 mt-2 hover:bg-indigo-700 active:scale-[0.98] transition-all">
                Курсту сактоо
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManager;