import React, { useState } from 'react';
import { Search, Plus, Trash2, Download, X, Mail, Phone, MoreVertical, GraduationCap, Calendar } from 'lucide-react';
import { Student, StudentStatus, PaymentStatus } from '../types';

interface StudentListProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  searchTerm: string;
  t: any;
}

const StudentList: React.FC<StudentListProps> = ({ students, setStudents, searchTerm, t }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: 'Frontend React'
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Студентти өчүрүүнү каалайсызбы?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const student: Student = {
      id: 'st-' + Math.random().toString(36).substr(2, 9),
      ...newStudent,
      courses: [newStudent.course],
      status: StudentStatus.ACTIVE,
      paymentStatus: PaymentStatus.UNPAID,
      enrollmentDate: new Date().toISOString().split('T')[0]
    };
    setStudents(prev => [student, ...prev]);
    setIsModalOpen(false);
    setNewStudent({ firstName: '', lastName: '', email: '', phone: '', course: 'Frontend React' });
  };

  const filteredStudents = students.filter(s => 
    `${s.firstName} ${s.lastName} ${s.email} ${s.phone}`.toLowerCase().includes((searchTerm || localSearch).toLowerCase())
  );

  const getStatusColor = (status: StudentStatus) => {
    const colors = {
      [StudentStatus.ACTIVE]: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      [StudentStatus.GRADUATED]: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      [StudentStatus.DROPPED]: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    };
    return colors[status] || 'bg-slate-500/10 text-slate-500';
  };

  return (
    <div className="space-y-6 pb-20 sm:pb-0">
      
      {/* --- ACTION BAR (Responsive) --- */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between sm:hidden">
            <h2 className="text-2xl font-black dark:text-white">Студенттер</h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg"
            >
              <Plus size={24} />
            </button>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative group flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Издөө..." 
              className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-2xl outline-none transition-all bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:ring-4 focus:ring-indigo-500/10"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-bold hover:bg-slate-200 transition-all">
              <Download className="w-4 h-4" />
              <span>CSV</span>
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-600/20"
            >
              <Plus className="w-5 h-5" />
              Каттоо
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE VIEW (Cards) - Hidden on Desktop --- */}
      <div className="grid grid-cols-1 gap-4 sm:hidden">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
             <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black">
                      {student.firstName[0]}{student.lastName[0]}
                   </div>
                   <div>
                      <h3 className="font-black text-slate-900 dark:text-white">{student.firstName} {student.lastName}</h3>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{student.enrollmentDate}</p>
                   </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${getStatusColor(student.status)}`}>
                  {student.status}
                </span>
             </div>

             <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                   <GraduationCap size={14} className="text-indigo-500" />
                   <span className="font-bold">{student.courses.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                   <Mail size={14} className="text-slate-400" />
                   {student.email}
                </div>
             </div>

             <div className="flex gap-2">
                <a href={`tel:${student.phone}`} className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-black dark:text-white">
                   <Phone size={14} /> Чалгыла
                </a>
                <button 
                  onClick={() => handleDelete(student.id)}
                  className="p-3 bg-rose-500/10 text-rose-500 rounded-xl"
                >
                   <Trash2 size={16} />
                </button>
             </div>
          </div>
        ))}
      </div>

      {/* --- DESKTOP VIEW (Table) - Hidden on Mobile --- */}
      <div className="hidden sm:block bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800 text-slate-400 text-[10px] uppercase tracking-[0.15em] font-black">
              <th className="px-8 py-5">Студент</th>
              <th className="px-6 py-5">Курстар</th>
              <th className="px-6 py-5 text-center">Статус</th>
              <th className="px-6 py-5">Дата</th>
              <th className="px-8 py-5 text-right">Аракет</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50/80 dark:hover:bg-indigo-500/5 transition-all group">
                <td className="px-8 py-5 text-sm font-black dark:text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">{student.firstName[0]}</div>
                    {student.firstName} {student.lastName}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-[10px] font-bold text-slate-600 dark:text-slate-400">
                    {student.courses[0]}
                  </span>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black border ${getStatusColor(student.status)}`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-slate-500 text-sm">{student.enrollmentDate}</td>
                <td className="px-8 py-5 text-right flex justify-end gap-2">
                   <button onClick={() => handleDelete(student.id)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                      <Trash2 size={16} />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- RESPONSIVE MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 rounded-t-[2.5rem] sm:rounded-[3rem] w-full max-w-md shadow-2xl animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 duration-300 border dark:border-slate-800">
            <div className="p-6 sm:p-8 flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-black dark:text-white">Жаңы студент</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                <X size={20} className="dark:text-slate-400"/>
              </button>
            </div>
            <form onSubmit={handleAddStudent} className="p-6 sm:p-8 pt-0 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input required className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none text-sm dark:text-white"
                  placeholder="Аты" value={newStudent.firstName} onChange={e => setNewStudent({...newStudent, firstName: e.target.value})} />
                <input required className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none text-sm dark:text-white"
                  placeholder="Фамилиясы" value={newStudent.lastName} onChange={e => setNewStudent({...newStudent, lastName: e.target.value})} />
              </div>
              <input required type="email" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none text-sm dark:text-white"
                placeholder="Email" value={newStudent.email} onChange={e => setNewStudent({...newStudent, email: e.target.value})} />
              <input required className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none text-sm dark:text-white"
                placeholder="Телефон" value={newStudent.phone} onChange={e => setNewStudent({...newStudent, phone: e.target.value})} />
              <button type="submit" className="w-full py-4 sm:py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black shadow-xl">
                Сактоо
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;