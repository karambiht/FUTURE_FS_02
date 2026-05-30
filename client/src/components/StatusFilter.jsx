import React from 'react';

const StatusFilter = ({ activeFilter, setActiveFilter, leads = [] }) => {
  const statuses = [
    { key: 'All', label: 'All Leads', count: leads.length },
    { key: 'New', label: 'New', count: leads.filter(l => l.status === 'New').length },
    { key: 'Contacted', label: 'Contacted', count: leads.filter(l => l.status === 'Contacted').length },
    { key: 'Converted', label: 'Converted', count: leads.filter(l => l.status === 'Converted').length }
  ];

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2 hidden md:inline">
        Filter By Status:
      </span>
      <div className="flex flex-wrap p-1 bg-slate-900 border border-slate-800 rounded-lg">
        {statuses.map((status) => {
          const isActive = activeFilter === status.key;
          return (
            <button
              key={status.key}
              onClick={() => setActiveFilter(status.key)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                isActive
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <span>{status.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                isActive 
                  ? 'bg-brand-600 text-brand-100' 
                  : 'bg-slate-800 text-slate-500'
              }`}>
                {status.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StatusFilter;
