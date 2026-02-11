
import React, { useState, useEffect } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Sun, 
  Save,
  CheckCircle2
} from 'lucide-react';
import { Language } from '../translations';

interface SettingsProps {
  adminProfile: {
    name: string;
    email: string;
    phone: string;
    role: string;
  };
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

  const bgColor = isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200';
  const textColor = isDarkMode ? 'text-white' : 'text-slate-900';
  const mutedTextColor = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const inputBg = isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800';

  return (
    <div className={`max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${textColor}`}>{t.settings}</h2>
          <p className={mutedTextColor}>Профилиңизди жана колдонмонун жөндөөлөрүн башкарыңыз</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {isSaved ? t.saved : t.save}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-64 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  isActive 
                    ? (isDarkMode ? 'bg-slate-800 text-indigo-400 shadow-sm border border-slate-700' : 'bg-white text-indigo-600 shadow-sm border border-slate-200')
                    : (isDarkMode ? 'text-slate-500 hover:bg-slate-800 hover:text-slate-300' : 'text-slate-500 hover:bg-slate-100')
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className={`flex-1 rounded-3xl border shadow-sm overflow-hidden transition-colors ${bgColor}`}>
          {activeTab === 'profile' && (
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-6">
                <img src="https://picsum.photos/100/100" className={`w-24 h-24 rounded-3xl object-cover border-4 ${isDarkMode ? 'border-slate-800' : 'border-slate-50'}`} />
                <div>
                  <h4 className={`text-lg font-bold ${textColor}`}>{adminProfile.name}</h4>
                  <p className={`text-sm ${mutedTextColor}`}>{adminProfile.email} • {adminProfile.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">{t.full_name}</label>
                  <input type="text" className={`w-full p-3 border rounded-xl outline-none focus:border-indigo-400 ${inputBg}`} value={draftProfile.name} onChange={e => setDraftProfile({...draftProfile, name: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">{t.email}</label>
                  <input type="email" className={`w-full p-3 border rounded-xl outline-none focus:border-indigo-400 ${inputBg}`} value={draftProfile.email} onChange={e => setDraftProfile({...draftProfile, email: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">{t.phone}</label>
                  <input type="text" className={`w-full p-3 border rounded-xl outline-none focus:border-indigo-400 ${inputBg}`} value={draftProfile.phone} onChange={e => setDraftProfile({...draftProfile, phone: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">{t.role}</label>
                  <input disabled type="text" className={`w-full p-3 border rounded-xl outline-none opacity-60 ${inputBg}`} value={draftProfile.role} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'general' && (
            <div className="p-8 space-y-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">{t.language}</label>
                <select 
                  className={`w-full p-3 border rounded-xl outline-none ${inputBg}`}
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                >
                  <option value="ky">Кыргызча</option>
                  <option value="en">English</option>
                  <option value="ru">Русский</option>
                </select>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <h4 className={`font-bold ${textColor}`}>{t.darkMode}</h4>
                  <p className={`text-sm ${mutedTextColor}`}>Интерфейсти караңгы же жарык түскө которуу</p>
                </div>
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-3 rounded-xl transition-all ${
                    isDarkMode ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
