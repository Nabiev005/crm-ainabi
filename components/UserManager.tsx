import React, { useState, useEffect } from 'react';
import { 
  UserPlus, Trash2, Shield, X, Eye, EyeOff, Lock, 
  Mail, User as UserIcon, ShieldCheck, Fingerprint 
} from 'lucide-react';
import { User, UserRole } from '../types';

interface UserManagerProps {
  t: any;
  isDarkMode: boolean;
}

const UserManager: React.FC<UserManagerProps> = ({ t, isDarkMode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCodes, setShowCodes] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '', 
    role: UserRole.MANAGER
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('crm_users') || '[]');
    setUsers(stored);
  }, []);

  const saveUsers = (updatedUsers: User[]) => {
    localStorage.setItem('crm_users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{4}$/.test(newUser.password)) {
      alert("Кирүү коду так 4 сандан турушу керек!");
      return;
    }
    const user: User = {
      id: 'mgr-' + Math.random().toString(36).substr(2, 9),
      ...newUser
    };
    saveUsers([user, ...users]);
    setIsModalOpen(false);
    setNewUser({ name: '', email: '', password: '', role: UserRole.MANAGER });
  };

  const deleteUser = (id: string) => {
    if (window.confirm('Бул менеджерди өчүрүүнү каалайсызбы?')) {
      saveUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
        <div>
          <h2 className={`text-2xl md:text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {t.users || 'Команда'}
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-medium mt-1">Кызматкерлердин системага кирүүсүн башкаруу</p>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button 
            onClick={() => setShowCodes(!showCodes)}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold border transition-all active:scale-95 ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 text-slate-300' 
                : 'bg-white border-slate-200 text-slate-600 shadow-sm'
            }`}
          >
            {showCodes ? <EyeOff size={18} /> : <Eye size={18} />}
            <span className="text-xs md:text-sm">{showCodes ? 'Жашыруу' : 'Коддор'}</span>
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-[2] md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-600/20 active:scale-95 transition-all"
          >
            <UserPlus size={20} />
            <span className="text-xs md:text-sm text-nowrap">Менеджер кошуу</span>
          </button>
        </div>
      </div>

      {/* --- USERS LIST (Mobile Friendly Card/Table) --- */}
      <div className={`mx-4 rounded-[2rem] border overflow-hidden transition-all ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'
      }`}>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left min-w-[600px] md:min-w-full">
            <thead>
              <tr className={`text-[10px] uppercase tracking-widest font-black ${
                isDarkMode ? 'bg-slate-800/50 text-slate-500' : 'bg-slate-50/50 text-slate-400'
              }`}>
                <th className="px-8 py-5">Кызматкер</th>
                <th className="px-6 py-5">Логин</th>
                <th className="px-6 py-5 text-center">PIN-код</th>
                <th className="px-8 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800' : 'divide-slate-50'}`}>
              {users.map((user) => (
                <tr key={user.id} className="group hover:bg-slate-50/50 dark:hover:bg-indigo-500/5 transition-all">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-500/20">
                        {user.name[0]}
                      </div>
                      <div>
                        <div className={`font-black tracking-tight text-sm md:text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {user.name}
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <ShieldCheck className="w-3 h-3 text-indigo-500" />
                          <span className="text-[9px] font-black uppercase text-indigo-500 tracking-tighter">{user.role}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-xs md:text-sm">
                       <Mail size={14} className="opacity-50" />
                       {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-500 ${
                      showCodes 
                        ? 'bg-indigo-50 border-indigo-100 text-indigo-600' 
                        : 'bg-slate-100 border-slate-200 text-slate-300 dark:bg-slate-800 dark:border-slate-700'
                    }`}>
                      <Lock size={12} className={showCodes ? 'text-indigo-500' : 'text-slate-400'} />
                      <span className={`font-mono font-black tracking-widest text-sm md:text-base ${showCodes ? '' : 'blur-md select-none'}`}>
                        {user.password}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button 
                      onClick={() => deleteUser(user.id)} 
                      className="p-2.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {users.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                <UserIcon size={32} />
              </div>
              <p className="text-slate-400 font-bold text-sm">Кызматкерлердин тизмеси бош</p>
            </div>
          )}
        </div>
      </div>

      {/* --- ADD USER MODAL (Bottom Sheet on Mobile) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-md p-0 sm:p-4 animate-in fade-in duration-300">
          <div className={`w-full max-w-md rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-500 border-t sm:border ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
          }`}>
            <div className="p-6 md:p-8 border-b dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/30">
                  <Fingerprint size={28} />
                </div>
                <h3 className={`text-xl md:text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Каттоо</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500">
                <X size={20}/>
              </button>
            </div>
            
            <form onSubmit={handleAddUser} className="p-6 md:p-8 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Толук аты</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input required placeholder="Асан Асанов" className={`w-full pl-12 pr-4 py-4 border rounded-2xl outline-none focus:ring-4 transition-all font-bold ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:ring-indigo-500/10' : 'bg-slate-50 border-slate-200 focus:ring-indigo-500/5'
                  }`} value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email / Логин</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input required type="email" placeholder="asan@crm.kg" className={`w-full pl-12 pr-4 py-4 border rounded-2xl outline-none focus:ring-4 transition-all font-bold ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:ring-indigo-500/10' : 'bg-slate-50 border-slate-200 focus:ring-indigo-500/5'
                  }`} value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between px-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Кирүү PIN-коду (4 сан)</label>
                </div>
                <input required type="text" inputMode="numeric" maxLength={4} placeholder="• • • •"
                  className={`w-full p-5 border rounded-2xl outline-none text-center text-3xl font-black tracking-[1em] transition-all shadow-inner ${
                    isDarkMode 
                      ? 'bg-slate-950 border-slate-700 text-indigo-400 focus:border-indigo-500' 
                      : 'bg-white border-slate-200 text-indigo-600 focus:border-indigo-500'
                  }`}
                  value={newUser.password} 
                  onChange={e => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val.length <= 4) setNewUser({...newUser, password: val});
                  }} 
                />
              </div>

              <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all mt-4 active:scale-95">
                Менеджерди кошуу
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManager;