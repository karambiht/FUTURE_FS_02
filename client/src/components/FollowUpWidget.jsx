import React from 'react';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';

const FollowUpWidget = ({ leads = [], onEditLead }) => {
  // Helpers to get local dates
  const getLocalDateString = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  };

  const todayStr = getLocalDateString(0);
  const tomorrowStr = getLocalDateString(1);

  // Filter leads with follow-up dates and status not equal to 'Converted'
  const pendingFollowUps = leads.filter(
    (lead) => lead.followUpDate && lead.status !== 'Converted'
  );

  // Grouping leads
  const grouped = {
    today: [],
    tomorrow: [],
    upcoming: []
  };

  pendingFollowUps.forEach((lead) => {
    try {
      const leadDateStr = new Date(lead.followUpDate).toISOString().split('T')[0];
      if (leadDateStr === todayStr) {
        grouped.today.push(lead);
      } else if (leadDateStr === tomorrowStr) {
        grouped.tomorrow.push(lead);
      } else if (leadDateStr > tomorrowStr) {
        grouped.upcoming.push(lead);
      }
    } catch (e) {
      console.error('Error grouping follow-up lead:', lead);
    }
  });

  const hasFollowUps = 
    grouped.today.length > 0 || 
    grouped.tomorrow.length > 0 || 
    grouped.upcoming.length > 0;

  // Render list sections
  const renderListSection = (title, items, badgeClass) => {
    if (items.length === 0) return null;
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            {title}
          </span>
          <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${badgeClass}`}>
            {items.length}
          </span>
        </div>
        <div className="space-y-1.5">
          {items.map((lead) => (
            <div 
              key={lead._id}
              onClick={() => onEditLead(lead)}
              className="bg-slate-950 border border-slate-800/80 hover:border-slate-700/80 rounded-lg p-3 flex items-start justify-between cursor-pointer transition group"
            >
              <div className="space-y-0.5 max-w-[80%]">
                <p className="text-xs font-semibold text-white group-hover:text-brand-400 transition truncate">
                  {lead.name}
                </p>
                <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wide truncate">
                  {lead.company} • {lead.source}
                </p>
              </div>
              <FiArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-brand-400 transition transform group-hover:translate-x-0.5 shrink-0 mt-0.5" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
      {/* Symmetric Header */}
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
        <div className="bg-brand-500/10 text-brand-400 p-2 rounded-lg border border-brand-500/20 shrink-0">
          <FiCalendar className="h-4 w-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-white tracking-tight">Upcoming Follow-Ups</h4>
          <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Scheduled Contacts</p>
        </div>
      </div>

      {/* Symmetric empty states with Icon, Title, and supportive description */}
      {!hasFollowUps ? (
        <div className="py-8 text-center space-y-3.5 flex flex-col items-center">
          <div className="bg-slate-950 p-3 rounded-full border border-slate-800 text-slate-600">
            <FiClock className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h5 className="text-xs font-bold text-white">No Upcoming Contacts</h5>
            <p className="text-[10px] text-slate-500 max-w-[190px] leading-relaxed mx-auto">
              Your scheduled follow-up queue is empty. Completed deals are omitted automatically.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4.5 max-h-[350px] overflow-y-auto pr-1">
          {renderListSection('Today', grouped.today, 'bg-red-500/10 text-red-400 border border-red-500/20')}
          {renderListSection('Tomorrow', grouped.tomorrow, 'bg-amber-500/10 text-amber-400 border border-amber-500/20')}
          {renderListSection('Upcoming', grouped.upcoming, 'bg-brand-500/10 text-brand-400 border border-brand-500/20')}
        </div>
      )}
    </div>
  );
};

export default FollowUpWidget;
