
import React from 'react';
import { 
  Users, 
  BookOpen, 
  UserPlus, 
  CreditCard, 
  Bot, 
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Settings as SettingsIcon
} from 'lucide-react';
import { View, UserRole } from '../types';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  t: any;
  userRole: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen, toggleSidebar, t, userRole }) => {
  const isDirector = userRole === UserRole.DIRECTOR;

  const menuItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'schedule', label: t.schedule, icon: Calendar },
    { id: 'students', label: t.students, icon: Users },
    { id: 'courses', label: t.courses, icon: BookOpen },
    { id: 'leads', label: t.leads, icon: UserPlus },
    { id: 'finances', label: t.finances, icon: CreditCard },
    { id: 'ai-assistant', label: t.aiAssistant, icon: Bot },
  ];

  if (isDirector) {
    menuItems.push({ id: 'users', label: t.users, icon: ShieldCheck });
  }

  return (
    <aside 
      className={`fixed top-0 left-0 h-full bg-slate-900 text-white transition-all duration-300 z-20 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
        <div className={`flex items-center gap-3 ${!isOpen && 'hidden'}`}>
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg">
            Ai
          </div>
          <span className="font-bold tracking-tight text-xl">Nabi</span>
        </div>
        {!isOpen && (
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg mx-auto">
            Ai
          </div>
        )}
        <button 
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-800 shadow-md hover:bg-slate-50 transition-colors z-30"
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      <nav className="mt-8 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-8 left-0 w-full px-4 space-y-2">
        <button 
          onClick={() => setActiveView('settings')}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
            activeView === 'settings' 
              ? 'bg-indigo-600 text-white' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <SettingsIcon className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span className="font-medium">{t.settings}</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
