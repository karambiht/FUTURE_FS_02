import React from 'react';
import { FiEdit2, FiTrash2, FiCalendar, FiBriefcase, FiStar, FiPhoneCall, FiUserCheck, FiBookOpen } from 'react-icons/fi';

const LeadTable = ({ leads = [], onEdit, onDelete, onStatusChange }) => {
  // Helper to format dates cleanly
  const formatDate = (dateString) => {
    if (!dateString) return 'Not scheduled';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Helper to map status specific styles & icons
  const getStatusMeta = (status) => {
    switch (status) {
      case 'New':
        return {
          icon: FiStar,
          // Blue badge for New status as requested
          colorClass: 'text-blue-400 bg-blue-950/40 border-blue-500/20 hover:border-blue-500/40'
        };
      case 'Contacted':
        return {
          icon: FiPhoneCall,
          colorClass: 'text-amber-400 bg-amber-950/40 border-amber-500/20 hover:border-amber-500/40'
        };
      case 'Converted':
        return {
          icon: FiUserCheck,
          colorClass: 'text-emerald-450 bg-emerald-950/40 border-emerald-500/20 hover:border-emerald-500/40'
        };
      default:
        return {
          icon: FiCalendar,
          colorClass: 'text-slate-400 bg-slate-800/40 border-slate-700/20'
        };
    }
  };

  // Helper to style lead sources as distinct premium badges
  const getSourceBadgeStyle = (source) => {
    switch (source) {
      case 'LinkedIn':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'Website':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      case 'Referral':
        return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
      case 'Instagram':
        return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      case 'Facebook':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Event':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-slate-800/40 text-slate-400 border-slate-700/20';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800/80 bg-slate-900/50">
              <th className="py-3.5 px-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Lead Profile</th>
              <th className="py-3.5 px-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Company & Source</th>
              <th className="py-3.5 px-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</th>
              <th className="py-3.5 px-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Next Follow-Up</th>
              <th className="py-3.5 px-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Interaction Log</th>
              <th className="py-3.5 px-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Added On</th>
              <th className="py-3.5 px-5 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 bg-slate-900">
            {leads.map((lead) => {
              const meta = getStatusMeta(lead.status);
              const StatusIcon = meta.icon;

              return (
                <tr 
                  key={lead._id}
                  className="hover:bg-slate-850/20 transition duration-150 group"
                >
                  {/* Lead Info */}
                  <td className="py-3.5 px-5">
                    <div className="flex flex-col">
                      <span className="font-semibold text-xs text-white group-hover:text-brand-400 transition">
                        {lead.name}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5 font-medium">{lead.email}</span>
                    </div>
                  </td>

                  {/* Company & Source */}
                  <td className="py-3.5 px-5">
                    <div className="flex flex-col space-y-1.5">
                      <div className="flex items-center text-[11px] font-semibold text-slate-200">
                        <FiBriefcase className="mr-1.5 h-3.5 w-3.5 text-slate-500 shrink-0" />
                        <span className="truncate max-w-[130px]">{lead.company}</span>
                      </div>
                      <div className="pl-5">
                        <span className={`inline-block text-[9px] font-extrabold px-2 py-0.5 rounded border tracking-wider uppercase ${getSourceBadgeStyle(lead.source)}`}>
                          {lead.source}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Enhanced Status Badges with custom Select bindings */}
                  <td className="py-3.5 px-5">
                    <div className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold w-[128px] transition ${meta.colorClass}`}>
                      <StatusIcon className="h-3.5 w-3.5 shrink-0" />
                      <select
                        value={lead.status}
                        onChange={(e) => onStatusChange(lead._id, e.target.value)}
                        className="w-full bg-transparent border-none outline-none appearance-none cursor-pointer pr-4 py-0 text-[11px] font-bold tracking-wide"
                        style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                      >
                        <option value="New" className="bg-slate-950 text-cyan-400">New</option>
                        <option value="Contacted" className="bg-slate-950 text-amber-400">Contacted</option>
                        <option value="Converted" className="bg-slate-950 text-emerald-400">Converted</option>
                      </select>
                      {/* Styled indicator caret */}
                      <span className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none text-[8px] text-slate-500 group-hover:text-slate-400">
                        ▼
                      </span>
                    </div>
                  </td>

                  {/* Follow-up Date */}
                  <td className="py-3.5 px-5 text-xs text-slate-350">
                    <div className="flex items-center gap-1.5">
                      <FiCalendar className="text-slate-500 h-3.5 w-3.5 shrink-0" />
                      <span className={lead.followUpDate && lead.status !== 'Converted' ? 'font-medium text-slate-200' : 'text-slate-500'}>
                        {formatDate(lead.followUpDate)}
                      </span>
                    </div>
                  </td>

                  {/* Notes */}
                  <td className="py-3.5 px-5 text-xs text-slate-350 max-w-[180px]">
                    <div className="flex items-center gap-1.5">
                      <FiBookOpen className="text-slate-500 h-3.5 w-3.5 shrink-0" />
                      <span className="truncate text-slate-350" title={lead.notes || 'No notes added'}>
                        {lead.notes || <span className="text-slate-600 italic">No logs</span>}
                      </span>
                    </div>
                  </td>

                  {/* Created Date */}
                  <td className="py-3.5 px-5 text-[10px] text-slate-500 font-medium">
                    {formatDate(lead.createdAt)}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onEdit(lead)}
                        className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-750 transition"
                        title="Edit details"
                      >
                        <FiEdit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(lead)}
                        className="p-1.5 rounded bg-red-950/20 text-red-400 hover:text-red-300 hover:bg-red-900/35 border border-red-900/20 transition"
                        title="Delete client"
                      >
                        <FiTrash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;
