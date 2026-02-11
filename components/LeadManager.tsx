
import React, { useState } from 'react';
import { UserPlus, MoreVertical, X, CheckCircle2 } from 'lucide-react';
import { Lead } from '../types';

// Added t: any to fix TypeScript error in App.tsx
interface LeadManagerProps {
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  t: any;
}

const LeadManager: React.FC<LeadManagerProps> = ({ leads, setLeads, t }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', email: '', source: 'Instagram' });

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

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Сатуу куйкуму (Leads)</h2>
        <button onClick={() => setIsModalOpen(true)} className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Лид кошуу
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-4">
        {(['New', 'Contacted', 'Meeting', 'Converted'] as const).map((column) => (
          <div key={column} className="min-w-[280px] bg-slate-100/50 p-4 rounded-2xl border border-slate-200 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-700 uppercase text-xs tracking-widest">{column}</h3>
              <span className="w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">
                {leads.filter(l => l.status === column).length}
              </span>
            </div>

            <div className="space-y-3">
              {leads.filter(l => l.status === column).map((lead) => (
                <div key={lead.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded uppercase">{lead.source}</span>
                    <select 
                      className="text-[10px] bg-slate-50 border-none outline-none rounded p-1"
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Meeting">Meeting</option>
                      <option value="Converted">Converted</option>
                    </select>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">{lead.name}</h4>
                  <p className="text-xs text-slate-500">{lead.email}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">Жаңы Лид</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleAddLead} className="p-6 space-y-4">
              <input required placeholder="Аты-жөнү" className="w-full p-3 bg-slate-50 border rounded-xl"
                value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})} />
              <input required type="email" placeholder="Email" className="w-full p-3 bg-slate-50 border rounded-xl"
                value={newLead.email} onChange={e => setNewLead({...newLead, email: e.target.value})} />
              <select className="w-full p-3 bg-slate-50 border rounded-xl" value={newLead.source}
                onChange={e => setNewLead({...newLead, source: e.target.value})}>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="Telegram">Telegram</option>
                <option value="WhatsApp">WhatsApp</option>
              </select>
              <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold">Лидти кошуу</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManager;
