
import React, { useState, useEffect } from 'react';
import { UserPlus, Trash2, Shield, X, Hash, Eye, EyeOff } from 'lucide-react';
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
    password: '', // Бул жерде 4 сан сакталат
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
    
    // 4 сан экенин текшерүү
    if (!/^\d{4}$/.test(newUser.password)) {
      alert("Кирүү коду так 4 сандан турушу керек!");
      return;
    }

    const user: User = {
      id: Date.now().toString(),
      ...newUser
    };
    const updated = [...users, user];
    saveUsers(updated);
    setIsModalOpen(false);
    setNewUser({ name: '', email: '', password: '', role: UserRole.MANAGER });
  };

  const deleteUser = (id: string) => {
    if (confirm('Бул менеджерди өчүрүүнү каалайсызбы?')) {
      const updated = users.filter(u => u.id !== id);
      saveUsers(updated);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Менеджерлерди башкаруу</h2>
          <p className="text-slate-500">Системага кирүү үчүн 4 сандан турган код бериңиз</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowCodes(!showCodes)}
            className={`px-4 py-2.5 rounded-xl border font-bold flex items-center gap-2 transition-all ${
              isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'
            }`}
          >
            {showCodes ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showCodes ? 'Коддорду жашыруу' : 'Коддорду көрүү'}
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Менеджер кошуу
          </button>
        </div>
      </div>

      <div className={`rounded-3xl border shadow-sm overflow-hidden ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <table className="w-full text-left">
          <thead>
            <tr className={`border-b text-xs uppercase tracking-wider font-bold ${isDarkMode ? 'bg-slate-800/50 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
              <th className="px-6 py-4">Менеджер</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Кирүү коду</th>
              <th className="px-6 py-4 text-right">Аракеттер</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
            {users.map((user) => (
              <tr key={user.id} className={`hover:bg-slate-50 transition-colors ${isDarkMode ? 'hover:bg-slate-800/50' : ''}`}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                      {user.name[0]}
                    </div>
                    <span className="font-bold">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{user.email}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Hash className="w-3 h-3 text-indigo-400" />
                    <span className={`font-mono font-bold tracking-widest ${showCodes ? 'text-indigo-600 dark:text-indigo-400' : 'blur-sm select-none'}`}>
                      {user.password}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => deleteUser(user.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500 font-medium">
                  Азырынча менеджерлер кошула элек. Жаңы кызматкерди кошуу үчүн жогорудагы баскычты басыңыз.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className={`rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white'}`}>
            <div className={`p-6 border-b flex items-center justify-between ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Жаңы менеджер каттоо</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleAddUser} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase px-1">Менеджердин аты-жөнү</label>
                <input 
                  required 
                  placeholder="Мисалы: Асан Асанов"
                  className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50'}`}
                  value={newUser.name} 
                  onChange={e => setNewUser({...newUser, name: e.target.value})} 
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase px-1">Email (Логин катары колдонулат)</label>
                <input 
                  required 
                  type="email" 
                  placeholder="asanov@example.com"
                  className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50'}`}
                  value={newUser.email} 
                  onChange={e => setNewUser({...newUser, email: e.target.value})} 
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase px-1">Кирүү коду (Так 4 сан)</label>
                <input 
                  required 
                  type="text" 
                  maxLength={4}
                  pattern="\d{4}"
                  placeholder="Мисалы: 1234"
                  className={`w-full p-4 border rounded-2xl outline-none text-center text-2xl font-black tracking-[1em] focus:ring-4 focus:ring-indigo-100 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:ring-slate-800' : 'bg-slate-100 border-slate-200 text-slate-900'}`}
                  value={newUser.password} 
                  onChange={e => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val.length <= 4) setNewUser({...newUser, password: val});
                  }} 
                />
                <p className="text-[10px] text-slate-400 text-center mt-2">Менеджер бул кодду кирүү үчүн колдонот</p>
              </div>
              <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold mt-4 shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all">
                Менеджерди сактоо
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManager;
