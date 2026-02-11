
import React, { useState } from 'react';
import { BookOpen, Users, Clock, Star, Edit3, Trash2, GraduationCap, X } from 'lucide-react';
import { Course } from '../types';

// Added t: any to fix TypeScript error in App.tsx
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
    if(confirm('Курсту өчүрөсүзбү?')) {
      setCourses(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Курстарды башкаруу</h2>
          <p className="text-slate-500">Жалпы {courses.length} активдүү программа</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Жаңы курс кошуу
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl transition-all group border-b-4 border-b-indigo-500">
            <div className="h-40 bg-slate-100 relative overflow-hidden">
              <img src={`https://picsum.photos/400/200?sig=${course.id}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
              <div className="absolute top-3 right-3 flex gap-2">
                <button onClick={() => deleteCourse(course.id)} className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-sm text-red-500 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-3 uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                {course.level}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
              <p className="text-sm text-slate-500 mb-6">Окутуучу: <span className="text-slate-700 font-medium">{course.instructor}</span></p>
              
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-slate-600 font-medium">
                <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{course.duration}</div>
                <div className="flex items-center gap-2"><Users className="w-4 h-4" />{course.studentsCount} студ.</div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="text-xl font-black text-slate-900">{course.price.toLocaleString()} сом</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">Жаңы курс</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleAddCourse} className="p-6 space-y-4">
              <input required placeholder="Курстун аталышы" className="w-full p-3 bg-slate-50 border rounded-xl"
                value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} />
              <input required placeholder="Окутуучу" className="w-full p-3 bg-slate-50 border rounded-xl"
                value={newCourse.instructor} onChange={e => setNewCourse({...newCourse, instructor: e.target.value})} />
              <input required placeholder="Узактыгы (мис: 3 ай)" className="w-full p-3 bg-slate-50 border rounded-xl"
                value={newCourse.duration} onChange={e => setNewCourse({...newCourse, duration: e.target.value})} />
              <input required type="number" placeholder="Баасы (сом)" className="w-full p-3 bg-slate-50 border rounded-xl"
                value={newCourse.price} onChange={e => setNewCourse({...newCourse, price: e.target.value})} />
              <select className="w-full p-3 bg-slate-50 border rounded-xl" value={newCourse.level} 
                onChange={e => setNewCourse({...newCourse, level: e.target.value as any})}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold">Курсту кошуу</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManager;
