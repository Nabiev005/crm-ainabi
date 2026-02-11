import React from 'react';
import { 
  Users, BookOpen, UserPlus, CreditCard, Bot, LayoutDashboard,
  ChevronLeft, ChevronRight, ShieldCheck, Calendar, Settings as SettingsIcon,
  LogOut
} from 'lucide-react';
import { View, UserRole } from '../types';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  t: any;
  userRole: UserRole;
  onLogout?: () => void; // Чыгуу функциясы
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen, toggleSidebar, t, userRole, onLogout }) => {
  const isDirector = userRole === UserRole.DIRECTOR;

  const menuItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'schedule', label: t.schedule, icon: Calendar },
    { id: 'students', label: t.students, icon: Users },
    { id: 'leads', label: t.leads, icon: UserPlus },
    { id: 'courses', label: t.courses, icon: BookOpen },
    { id: 'finances', label: t.finances, icon: CreditCard },
    { id: 'ai-assistant', label: t.aiAssistant, icon: Bot },
  ];

  if (isDirector) {
    menuItems.push({ id: 'users', label: t.users, icon: ShieldCheck });
  }

  return (
    <aside 
      className={`fixed top-0 left-0 h-full bg-[#0f172a] text-white transition-all duration-500 ease-in-out z-50 shadow-2xl ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo Section */}
      <div className="h-20 flex items-center px-4 mb-4 relative overflow-hidden">
        <div className={`flex items-center gap-3 transition-all duration-300 ${!isOpen ? 'translate-x-1' : ''}`}>
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-xl flex items-center justify-center font-black text-lg shadow-lg shadow-indigo-500/20 shrink-0">
            Ai
          </div>
          <span className={`font-black tracking-tighter text-2xl transition-opacity duration-300 ${!isOpen ? 'opacity-0' : 'opacity-100'}`}>
            Nabi<span className="text-indigo-500">.</span>
          </span>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={toggleSidebar}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-indigo-500 transition-transform active:scale-90 z-50 group"
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1.5 px-3 h-[calc(100%-180px)] overflow-y-auto no-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              title={!isOpen ? item.label : ''} // Tooltip ордуна жөнөкөй атрибут
              className={`group relative flex items-center gap-4 px-3.5 py-3.5 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
              
              {isOpen && (
                <span className={`font-bold text-sm tracking-wide transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                  {item.label}
                </span>
              )}

              {/* Активдүү индикатор */}
              {isActive && (
                <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="absolute bottom-6 left-0 w-full px-3 space-y-2">
        <button 
          onClick={() => setActiveView('settings')}
          title={!isOpen ? t.settings : ''}
          className={`w-full flex items-center gap-4 px-3.5 py-3.5 rounded-2xl transition-all ${
            activeView === 'settings' 
              ? 'bg-slate-800 text-indigo-400 border border-slate-700' 
              : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
          }`}
        >
          <SettingsIcon className={`w-5 h-5 shrink-0 ${activeView === 'settings' ? 'animate-spin-slow' : ''}`} />
          {isOpen && <span className="font-bold text-sm">{t.settings}</span>}
        </button>

        {onLogout && (
           <button 
           onClick={onLogout}
           className="w-full flex items-center gap-4 px-3.5 py-3.5 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all group"
         >
           <LogOut className="w-5 h-5 shrink-0 group-hover:-translate-x-1 transition-transform" />
           {isOpen && <span className="font-bold text-sm">Чыгуу</span>}
         </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;