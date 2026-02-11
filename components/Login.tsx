import React, { useState } from 'react';
import { LogIn, ShieldCheck, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Реалдуулук үчүн кичинекей кечигүү (имитация)
    setTimeout(() => {
      // Директор үчүн Айбек Набиев
      if (email === 'ajbeknabiev90@gmail.com' && password === 'Aibek230605') {
        onLogin({
          id: '1',
          name: 'Айбек Набиев',
          email: email,
          role: UserRole.DIRECTOR
        });
        setIsLoading(false);
        return;
      }

      // Башка менеджерлер
      const storedUsers = JSON.parse(localStorage.getItem('crm_users') || '[]');
      const user = storedUsers.find((u: any) => u.email === email && u.password === password);

      if (user) {
        onLogin(user);
      } else {
        setError('Логин же кирүү коду туура эмес!');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-500 ${
      isDarkMode ? 'bg-[#020617]' : 'bg-slate-50'
    }`}>
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 ${isDarkMode ? 'bg-indigo-500' : 'bg-indigo-300'}`} />
        <div className={`absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 ${isDarkMode ? 'bg-purple-500' : 'bg-purple-300'}`} />
      </div>

      <div className={`w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl border transition-all animate-in fade-in zoom-in-95 duration-700 relative z-10 ${
        isDarkMode ? 'bg-slate-900/80 backdrop-blur-xl border-slate-800' : 'bg-white border-slate-100'
      }`}>
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-3xl flex items-center justify-center text-white mb-6 shadow-2xl shadow-indigo-500/40 rotate-3">
            <LogIn className="w-10 h-10" />
          </div>
          <h1 className={`text-3xl font-black tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            AiNabi <span className="text-indigo-500">CRM</span>
          </h1>
          <p className="text-slate-500 text-center text-sm font-medium">Кош келиңиз! Системадан пайдалануу үчүн маалыматтарды толтуруңуз.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-2xl text-xs font-bold border border-red-100 dark:border-red-500/20 animate-in shake duration-300 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              {error}
            </div>
          )}
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Электрондук почта</label>
            <div className="relative group">
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isDarkMode ? 'text-slate-600' : 'text-slate-400'} group-focus-within:text-indigo-500`} />
              <input 
                required
                type="email" 
                autoComplete="email"
                placeholder="example@mail.com"
                className={`w-full pl-12 pr-4 py-4 rounded-2xl outline-none focus:ring-4 transition-all border font-medium ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700 text-white focus:ring-indigo-500/10 focus:border-indigo-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-indigo-100 focus:border-indigo-400'
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Пароль же кирүү коду</label>
            <div className="relative group">
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isDarkMode ? 'text-slate-600' : 'text-slate-400'} group-focus-within:text-indigo-500`} />
              <input 
                required
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                className={`w-full pl-12 pr-12 py-4 rounded-2xl outline-none focus:ring-4 transition-all border font-medium ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700 text-white focus:ring-indigo-500/10 focus:border-indigo-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-indigo-100 focus:border-indigo-400'
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-70 disabled:hover:translate-y-0`}
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-6 h-6" />
                Кирүү
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800/50 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AiNabi Tech &copy; 2026</p>
        </div>
      </div>
    </div>
  );
};

export default Login;