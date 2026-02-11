import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Search,
  LogOut
} from 'lucide-react';
import { View, Student, Course, Lead, User, UserRole } from '../types';
import { translations, Language } from '../translations';

const INITIAL_STUDENTS: Student[] = [];
const INITIAL_COURSES: Course[] = [];
const INITIAL_LEADS: Lead[] = [];
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import StudentList from '../components/StudentList';
import CourseManager from '../components/CourseManager';
import LeadManager from '../components/LeadManager';
import FinancialAnalytics from '../components/FinancialAnalytics';
import AIAssistant from '../components/AIAssistant';
import Settings from '../components/Settings';
import Login from '../components/Login';
import UserManager from '../components/UserManager';
import ScheduleManager from '../components/ScheduleManager';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('crm_session');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('crm_dark_mode') === 'true');
  const [language, setLanguage] = useState<Language>('ky');
  
  const t = translations[language];

  // Dark Mode эффект
  useEffect(() => {
    localStorage.setItem('crm_dark_mode', isDarkMode.toString());
  }, [isDarkMode]);

  // Сессияны сактоо
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('crm_session', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('crm_session');
    }
  }, [currentUser]);

  // Маалыматтар (Students, Courses, Leads)
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('crm_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('crm_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('crm_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  // Маалыматтар өзгөргөндө сактоо
  useEffect(() => localStorage.setItem('crm_students', JSON.stringify(students)), [students]);
  useEffect(() => localStorage.setItem('crm_courses', JSON.stringify(courses)), [courses]);
  useEffect(() => localStorage.setItem('crm_leads', JSON.stringify(leads)), [leads]);

  const [globalSearch, setGlobalSearch] = useState('');

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveView('dashboard');
  };

  const updateProfile = (profileData: any) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...profileData };
      setCurrentUser(updatedUser);
      if (currentUser.role !== UserRole.DIRECTOR) {
        const storedUsers = JSON.parse(localStorage.getItem('crm_users') || '[]');
        const updatedUsers = storedUsers.map((u: User) => u.id === currentUser.id ? updatedUser : u);
        localStorage.setItem('crm_users', JSON.stringify(updatedUsers));
      }
    }
  };

  if (!currentUser) {
    return <Login onLogin={setCurrentUser} t={t} isDarkMode={isDarkMode} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard students={students} courses={courses} t={t} />;
      case 'schedule':
        return <ScheduleManager t={t} isDarkMode={isDarkMode} />;
      case 'students':
        return <StudentList students={students} setStudents={setStudents} searchTerm={globalSearch} t={t} />;
      case 'courses':
        return <CourseManager courses={courses} setCourses={setCourses} t={t} />;
      case 'leads':
        return <LeadManager leads={leads} setLeads={setLeads} t={t} />;
      case 'finances':
        return <FinancialAnalytics students={students} t={t} />;
      case 'ai-assistant':
        return <AIAssistant language={language} />;
      case 'users':
        return <UserManager t={t} isDarkMode={isDarkMode} />;
      case 'settings':
        return (
          <Settings 
            adminProfile={{
              name: currentUser.name,
              email: currentUser.email,
              phone: '+996 555 000 000',
              role: currentUser.role
            }} 
            setAdminProfile={updateProfile}
            isDarkMode={isDarkMode} 
            setIsDarkMode={setIsDarkMode}
            language={language}
            setLanguage={setLanguage}
            t={t}
          />
        );
      default:
        return <Dashboard students={students} courses={courses} t={t} />;
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'dark bg-slate-950 text-white' : 'bg-slate-50 text-slate-800'}`}>
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        t={t}
        userRole={currentUser.role}
      />

      <main className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <header className={`h-16 border-b flex items-center justify-between px-8 sticky top-0 z-10 transition-colors ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">
              {t[activeView as keyof typeof t] || t.dashboard}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
              <input 
                type="text" 
                placeholder={t.search} 
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-full text-sm transition-all outline-none w-64 ${
                  isDarkMode 
                    ? 'bg-slate-800 border-transparent text-white focus:bg-slate-700 focus:ring-4 focus:ring-slate-800' 
                    : 'bg-slate-100 border-transparent focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100'
                }`}
              />
            </div>
            
            <button className={`relative p-2 rounded-full transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className={`flex items-center gap-3 pl-4 border-l ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              <div className="text-right">
                <p className={`text-sm font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>{currentUser.name}</p>
                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{currentUser.role}</p>
              </div>
              <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
