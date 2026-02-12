
import React, { useState } from 'react';
import { Search, Filter, Plus, Mail, Phone, Trash2, Download, X, MoreVertical } from 'lucide-react';
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
      id: Math.random().toString(36).substr(2, 9),
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
    `${s.firstName} ${s.lastName} ${s.email}`.toLowerCase().includes((searchTerm || localSearch).toLowerCase())
  );

  const getStatusColor = (status: StudentStatus) => {
    switch (status) {
      case StudentStatus.ACTIVE: return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case StudentStatus.GRADUATED: return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case StudentStatus.DROPPED: return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Студенттин аты же почтасы..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl outline-none transition-all shadow-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-slate-800 focus:border-indigo-400"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>

        <button className="w-full lg:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Жаңы студент
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Студент</th>
                <th className="px-6 py-4 font-bold">Байланыш</th>
                <th className="px-6 py-4 font-bold">Курстар</th>
                <th className="px-6 py-4 font-bold">Статус</th>
                <th className="px-6 py-4 font-bold">Дата</th>
                <th className="px-6 py-4 font-bold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-5 font-semibold text-slate-900 dark:text-slate-100 truncate max-w-[150px]">{student.firstName} {student.lastName}</td>
                  <td className="px-6 py-5 text-slate-600 dark:text-slate-400 truncate max-w-[150px]">{student.email}</td>
                  <td className="px-6 py-5">
                     <div className="flex flex-wrap gap-1">
                      {student.courses.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded text-[10px]">
                          {c}
                        </span>
                      ))}
                     </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-slate-500 dark:text-slate-500">{student.enrollmentDate}</td>
                  <td className="px-6 py-5 text-right">
                    <button onClick={() => handleDelete(student.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors md:opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  {student.firstName[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{student.firstName} {student.lastName}</h4>
                  <p className="text-xs text-slate-500">{student.email}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${getStatusColor(student.status)}`}>
                {student.status}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {student.courses.map((c, i) => (
                <span key={i} className="px-2 py-0.5 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded text-[10px] border border-slate-100 dark:border-slate-700">
                  {c}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-50 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">{student.enrollmentDate}</span>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                  <Phone className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(student.id)} className="p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border dark:border-slate-800">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Жаңы студент</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                <X className="w-5 h-5 dark:text-slate-400"/>
              </button>
            </div>
            <form onSubmit={handleAddStudent} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Аты</label>
                  <input required type="text" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-indigo-500 dark:text-white"
                    value={newStudent.firstName} onChange={e => setNewStudent({...newStudent, firstName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Фамилиясы</label>
                  <input required type="text" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-indigo-500 dark:text-white"
                    value={newStudent.lastName} onChange={e => setNewStudent({...newStudent, lastName: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Email</label>
                <input required type="email" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-indigo-500 dark:text-white"
                  value={newStudent.email} onChange={e => setNewStudent({...newStudent, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Телефон</label>
                <input required type="text" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-indigo-500 dark:text-white"
                  value={newStudent.phone} onChange={e => setNewStudent({...newStudent, phone: e.target.value})} />
              </div>
              <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
                Студентти каттоо
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
