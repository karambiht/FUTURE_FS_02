import React from 'react';
import { FiUsers, FiPlusCircle, FiPhoneCall, FiUserCheck } from 'react-icons/fi';

const StatsCards = ({ leads = [] }) => {
  // Calculate total metrics dynamically from the leads list
  const totalLeads = leads.length;
  const newLeads = leads.filter(lead => lead.status === 'New').length;
  const contactedLeads = leads.filter(lead => lead.status === 'Contacted').length;
  const convertedLeads = leads.filter(lead => lead.status === 'Converted').length;

  // Configuration for stats items
  const stats = [
    {
      title: 'Total Leads',
      value: totalLeads,
      icon: FiUsers,
      colorClass: 'text-brand-500 bg-brand-500/10 border-brand-500/20',
      label: 'All registered leads'
    },
    {
      title: 'New Leads',
      value: newLeads,
      icon: FiPlusCircle,
      colorClass: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
      label: 'Requires contact'
    },
    {
      title: 'Contacted Leads',
      value: contactedLeads,
      icon: FiPhoneCall,
      colorClass: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
      label: 'In discussion'
    },
    {
      title: 'Converted Leads',
      value: convertedLeads,
      icon: FiUserCheck,
      colorClass: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
      label: 'Closed & Won'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, idx) => (
        <div 
          key={idx} 
          className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between h-40 hover:border-slate-700/80 hover:-translate-y-1 transform transition-all duration-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{stat.title}</span>
            <div className={`p-2 rounded-lg border ${stat.colorClass} shrink-0`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-auto">
            <h3 className="text-3xl font-extrabold tracking-tight text-white">{stat.value}</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1 uppercase tracking-wide">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
