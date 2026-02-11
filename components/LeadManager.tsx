import React, { useState } from 'react';
import { UserPlus, X, Mail, ChevronRight, MessageCircle, Instagram, Facebook, Send } from 'lucide-react';
import { Lead } from '../types';

interface LeadManagerProps {
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  t: any;
}

const LeadManager: React.FC<LeadManagerProps> = ({ leads, setLeads, t }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Lead['status']>('New');
  const [newLead, setNewLead] = useState({ name: '', email: '', source: 'Instagram' });

  const columns: { id: Lead['status']; label: string; color: string }[] = [
    { id: 'New', label: 'Жаңы', color: 'bg-blue-500' },
    { id: 'Contacted', label: 'Байланыш', color: 'bg-amber-500' },
    { id: 'Meeting', label: 'Жолугушуу', color: 'bg-purple-500' },
    { id: 'Converted', label: 'Сатылды', color: 'bg-emerald-500' }
  ];

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    const lead: Lead = {
      id: 'l' + Date.now(),
      name: newLead.name,
      email: newLead.email,
      source: newLead.source,
      status: 'New'
    };
    setLeads(prev => [lead, ...prev]);
    setIsModalOpen(false);
    setNewLead({ name: '', email: '', source: 'Instagram' });
  };

  const updateLeadStatus = (id: string, newStatus: Lead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? {...l, status: newStatus} : l));
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Instagram': return <Instagram size={14} />;
      case 'Facebook': return <Facebook size={14} />;
      case 'Telegram': return <Send size={14} />;
      default: return <MessageCircle size={14} />;
    }
  };

  return (
    <div className="space-y-6 pb-20 sm:pb-0">
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Сатуу куйкуму</h2>
          <p className="text-sm text-slate-500 font-medium">{leads.length} жалпы лид</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="w-full sm:w-auto px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          Лид кошуу
        </button>
      </div>

      {/* --- MOBILE TABS (Scrollable) --- */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {columns.map((col) => (
          <button
            key={col.id}
            onClick={() => setActiveTab(col.id)}
            className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border ${
              activeTab === col.id 
                ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900' 
                : 'bg-white text-slate-500 border-slate-200 dark:bg-slate-900 dark:border-slate-800'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${col.color}`}></span>
            {col.label}
            <span className="opacity-50 ml-1">{leads.filter(l => l.status === col.id).length}</span>
          </button>
        ))}
      </div>

      {/* --- LEAD CARDS / PIPELINE --- */}
      {/* Desktop'то 4 колонка, Мобилдикте активдүү Таб гана көрүнөт */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {columns.map((col) => (
          <div 
            key={col.id} 
            className={`${activeTab === col.id ? 'block' : 'hidden'} lg:block space-y-4`}
          >
            <div className="hidden lg:flex items-center justify-between mb-4 px-2">
              <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-[0.2em]">{col.label}</h3>
              <span className="text-xs font-bold text-slate-400">{leads.filter(l => l.status === col.id).length}</span>
            </div>

            <div className="space-y-3">
              {leads.filter(l => l.status === col.id).map((lead) => (
                <div key={lead.id} className="bg-white dark:bg-slate-900 p-5 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[9px] font-black rounded-lg uppercase">
                      {getSourceIcon(lead.source)} {lead.source}
                    </span>
                    <div className="relative">
                       <select 
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                       >
                        {columns.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                       </select>
                       <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-400">
                          <ChevronRight size={14} />
                       </div>
                    </div>
                  </div>
                  
                  <h4 className="font-black text-slate-900 dark:text-white mb-1">{lead.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Mail size={12} />
                    <span className="truncate">{lead.email}</span>
                  </div>
                </div>
              ))}
              
              {leads.filter(l => l.status === col.id).length === 0 && (
                <div className="py-10 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[2rem]">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Лид жок</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL (Bottom Sheet on Mobile) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 rounded-t-[2.5rem] sm:rounded-[2.5rem] w-full max-w-md shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="p-8 flex items-center justify-between border-b dark:border-slate-800">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Жаңы Лид</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full transition-colors"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleAddLead} className="p-8 space-y-4">
              <input required placeholder="Аты-жөнү" className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white"
                value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})} />
              <input required type="email" placeholder="Email" className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white"
                value={newLead.email} onChange={e => setNewLead({...newLead, email: e.target.value})} />
              <div className="grid grid-cols-2 gap-2">
                {['Instagram', 'Facebook', 'Telegram', 'WhatsApp'].map(src => (
                   <button
                    key={src}
                    type="button"
                    onClick={() => setNewLead({...newLead, source: src})}
                    className={`py-3 rounded-xl text-[10px] font-black uppercase border transition-all ${
                      newLead.source === src ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-transparent text-slate-500 border-slate-200 dark:border-slate-800'
                    }`}
                   >
                    {src}
                   </button>
                ))}
              </div>
              <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-indigo-600/20 mt-4">Кошуу</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManager;