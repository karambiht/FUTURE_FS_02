import React from 'react';
import { FiActivity, FiPlusCircle, FiTrash2, FiRefreshCw, FiEdit, FiInfo } from 'react-icons/fi';

const ActivityPanel = ({ activities = [], onClear }) => {
  // Helper to format relative time cleanly
  const formatTime = (timestamp) => {
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffMins = Math.round(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.round(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Helper to get activity icons and colors
  const getActivityMeta = (type) => {
    switch (type) {
      case 'create':
        return {
          icon: FiPlusCircle,
          colorClass: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
        };
      case 'delete':
        return {
          icon: FiTrash2,
          colorClass: 'text-red-400 bg-red-500/10 border-red-500/20'
        };
      case 'status':
        return {
          icon: FiRefreshCw,
          colorClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
        };
      case 'update':
        return {
          icon: FiEdit,
          colorClass: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
        };
      default:
        return {
          icon: FiActivity,
          colorClass: 'text-slate-400 bg-slate-500/10 border-slate-500/20'
        };
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
      {/* Symmetric Header Panel */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-brand-500/10 text-brand-400 p-2 rounded-lg border border-brand-500/20 shrink-0">
            <FiActivity className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white tracking-tight">Recent Activity</h4>
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Operation Logs</p>
          </div>
        </div>
        
        {activities.length > 0 && (
          <button
            onClick={onClear}
            className="text-[10px] font-bold text-slate-500 hover:text-slate-300 uppercase tracking-wide transition shrink-0"
          >
            Clear Log
          </button>
        )}
      </div>

      {/* Symmetric empty states with Icon, Title, and supportive description */}
      {activities.length === 0 ? (
        <div className="py-8 text-center space-y-3.5 flex flex-col items-center">
          <div className="bg-slate-950 p-3 rounded-full border border-slate-800 text-slate-650">
            <FiInfo className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h5 className="text-xs font-bold text-white">Registry Log Empty</h5>
            <p className="text-[10px] text-slate-500 max-w-[190px] leading-relaxed mx-auto">
              CRM activities will automatically populate as you manage client records.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
          {activities.map((act) => {
            const meta = getActivityMeta(act.type);
            const ActIcon = meta.icon;
            return (
              <div key={act.id} className="flex items-start space-x-3 text-xs leading-normal">
                {/* Visual Icon */}
                <div className={`p-1.5 rounded-lg border shrink-0 mt-0.5 ${meta.colorClass}`}>
                  <ActIcon className="h-3.5 w-3.5" />
                </div>
                {/* Description */}
                <div className="flex-grow space-y-0.5">
                  <p className="text-slate-200 font-medium text-[11px] leading-relaxed">{act.message}</p>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">{formatTime(act.timestamp)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ActivityPanel;
