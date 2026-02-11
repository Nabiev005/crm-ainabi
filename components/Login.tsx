
import React, { useState } from 'react';
import { LogIn, ShieldCheck, Mail, Lock } from 'lucide-react';
import { User, UserRole } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  t: any;
  isDarkMode: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, t, isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Директор үчүн Айбек Набиев аты менен кирүү
    if (email === 'ajbeknabiev90@gmail.com' && password === 'Aibek230605') {
      onLogin({
        id: '1',
        name: 'Айбек Набиев',
        email: email,
        role: UserRole.DIRECTOR
      });
      return;
    }

    // Башка менеджерлерди текшерүү
    const storedUsers = JSON.parse(localStorage.getItem('crm_users') || '[]');
    const user = storedUsers.find((u: any) => u.email === email && u.password === password);

    if (user) {
      onLogin(user);
    } else {
      setError('Логин же кирүү коду туура эмес!');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className={`w-full max-w-md p-8 rounded-3xl shadow-2xl border transition-all animate-in zoom-in-95 duration-500 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
      }`}>
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-indigo-500/30">
            <LogIn className="w-8 h-8" />
          </div>
          <h1 className={`text-2xl font-black tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>AiNabi CRM</h1>
          <p className="text-slate-500 text-center text-sm">{t.login_title}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 animate-bounce">
              {error}
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase px-1">Электрондук почта</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                required
                type="email" 
                placeholder={t.email_placeholder}
                className={`w-full pl-12 pr-4 py-4 rounded-2xl outline-none focus:ring-4 transition-all border ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-700 text-white focus:ring-slate-800 focus:border-indigo-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-indigo-100 focus:border-indigo-400'
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase px-1">Пароль же кирүү коду</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                required
                type="password" 
                placeholder="4 сандан турган кодду жазыңыз"
                className={`w-full pl-12 pr-4 py-4 rounded-2xl outline-none focus:ring-4 transition-all border ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-700 text-white focus:ring-slate-800 focus:border-indigo-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-indigo-100 focus:border-indigo-400'
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 mt-4"
          >
            <ShieldCheck className="w-5 h-5" />
            {t.login}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-500">Техникалык колдоо: support@ainabi.kg</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
