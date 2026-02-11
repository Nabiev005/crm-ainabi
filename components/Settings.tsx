import React, { useState, useEffect } from 'react';
import { 
  User, Bell, Shield, Globe, Moon, Sun, Save, CheckCircle2, Camera, Mail, Phone, Lock
} from 'lucide-react';
import { Language } from '../translations';

interface SettingsProps {
  adminProfile: { name: string; email: string; phone: string; role: string; };
  setAdminProfile: (profile: any) => void;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

const Settings: React.FC<SettingsProps> = ({ adminProfile, setAdminProfile, isDarkMode, setIsDarkMode, language, setLanguage, t }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaved, setIsSaved] = useState(false);
  const [draftProfile, setDraftProfile] = useState({...adminProfile});

  useEffect(() => {
    setDraftProfile({...adminProfile});
  }, [adminProfile]);

  const handleSave = () => {
    setAdminProfile(draftProfile);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const tabs = [
    { id: 'profile', label: t.profile, icon: User },
    { id: 'notifications', label: t.notifications, icon: Bell },
    { id: 'security', label: t.security, icon: Shield },
    { id: 'general', label: t.general, icon: Globe },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32 px-4 sm:px-6">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 sm:mt-0">
        <div className="text-center sm:text-left">
          <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {t.settings}
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">Системаны өзүңүзгө ыңгайлаштырыңыз</p>
        </div>
        
        {/* Desktop Save Button - hidden on mobile, shown on SM up */}
        <button 
          onClick={handleSave}
          className={`hidden sm:flex items-center gap-2 px-8 py-3 rounded-2xl font-black transition-all active:scale-95 shadow-xl ${
            isSaved 
              ? 'bg-green-500 text-white' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/20'
          }`}
        >
          {isSaved ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
          {isSaved ? t.saved : t.save}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
        
        {/* --- ADAPTIVE TABS --- */}
        {/* Телефондо 2 колонналуу торчо (grid), чоң экранда вертикалдык тизме */}
        <div className="grid grid-cols-2 lg:flex lg:flex-col gap-2 lg:w-64 shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center lg:justify-start gap-2 sm:gap-3 px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl font-bold transition-all text-[11px] sm:text-sm ${
                  isActive 
                    ? (isDarkMode ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-indigo-600 text-white shadow-lg')
                    : (isDarkMode ? 'bg-slate-800/40 text-slate-500 border border-white/5' : 'bg-slate-100 text-slate-500 border border-transparent')
                }`}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'animate-pulse' : ''}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* --- CONTENT CARD --- */}
        <div className={`flex-1 rounded-[1.5rem] sm:rounded-[2.5rem] border shadow-2xl transition-colors overflow-hidden ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
        }`}>
          
          {activeTab === 'profile' && (
            <div className="p-5 sm:p-8 md:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex flex-col items-center sm:flex-row gap-6 mb-8 sm:mb-10 text-center sm:text-left">
                <div className="relative group shrink-0">
                  <div className="absolute inset-0 bg-indigo-600 rounded-[1.5rem] sm:rounded-[2.5rem] blur-2xl opacity-20" />
                  <img 
                    src={`https://ui-avatars.com/api/?name=${adminProfile.name}&background=6366f1&color=fff&size=256`} 
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-[1.5rem] sm:rounded-[2rem] object-cover relative z-10 border-4 border-white dark:border-slate-800 shadow-xl" 
                    alt="Profile"
                  />
                  <button className="absolute -bottom-1 -right-1 z-20 p-2 bg-white dark:bg-slate-700 rounded-lg shadow-lg active:scale-90">
                    <Camera className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </button>
                </div>
                <div>
                  <h4 className={`text-xl sm:text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{adminProfile.name}</h4>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                    <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest rounded-md">
                      {adminProfile.role}
                    </span>
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[9px] font-black uppercase tracking-widest rounded-md">
                      ID: 90234
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {[
                  { label: t.full_name, icon: User, key: 'name' },
                  { label: t.email, icon: Mail, key: 'email', type: 'email' },
                  { label: t.phone, icon: Phone, key: 'phone' },
                  { label: t.role, icon: Shield, key: 'role', disabled: true },
                ].map((input) => (
                  <div key={input.key} className="space-y-1.5 sm:space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-tighter ml-1 flex items-center gap-1">
                      <input.icon className="w-3 h-3" /> {input.label}
                    </label>
                    <input 
                      disabled={input.disabled}
                      type={input.type || 'text'} 
                      className={`w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl outline-none border transition-all font-medium text-sm sm:text-base ${
                        isDarkMode 
                          ? 'bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10' 
                          : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/5'
                      } ${input.disabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
                      value={(draftProfile as any)[input.key]} 
                      onChange={e => setDraftProfile({...draftProfile, [input.key]: e.target.value})} 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ... General and Security tabs remain similar but with p-5 sm:p-12 ... */}
          {activeTab === 'general' && (
             <div className="p-5 sm:p-12 space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-indigo-500" />
                    <h4 className={`font-black text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t.language}</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                    {['ky', 'en', 'ru'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang as Language)}
                        className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border font-bold text-xs sm:text-sm transition-all ${
                          language === lang 
                            ? 'border-indigo-500 bg-indigo-500/5 text-indigo-600' 
                            : 'border-slate-200 dark:border-slate-800 text-slate-500'
                        }`}
                      >
                        {lang === 'ky' ? 'Кыргызча' : lang === 'en' ? 'English' : 'Русский'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`flex items-center justify-between p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] ${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white text-indigo-600 shadow-sm'}`}>
                      {isDarkMode ? <Moon className="w-5 h-5 sm:w-6 sm:h-6" /> : <Sun className="w-5 h-5 sm:w-6 sm:h-6" />}
                    </div>
                    <div>
                      <h4 className={`font-black text-xs sm:text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t.darkMode}</h4>
                      <p className="hidden sm:block text-[10px] text-slate-500 font-medium">Көзүңүзгө ыңгайлуу режимди тандаңыз</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`w-12 h-7 sm:w-14 sm:h-8 rounded-full p-1 transition-colors ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-300'}`}
                  >
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow-md transition-transform ${isDarkMode ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
             </div>
          )}
        </div>
      </div>

      {/* --- MOBILE STICKY SAVE BUTTON --- */}
      {/* Экрандын ылдый жагында катып турат, телефондо гана көрүнөт */}
      <div className="fixed bottom-0 left-0 right-0 p-4 sm:hidden bg-slate-900/10 backdrop-blur-lg border-t border-white/5 z-[60]">
        <button 
          onClick={handleSave}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black shadow-2xl transition-all active:scale-95 ${
            isSaved ? 'bg-green-500 text-white' : 'bg-indigo-600 text-white'
          }`}
        >
          {isSaved ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
          {isSaved ? t.saved : t.save}
        </button>
      </div>

    </div>
  );
};

export default Settings;