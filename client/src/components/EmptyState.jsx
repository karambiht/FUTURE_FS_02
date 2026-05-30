import React from 'react';
import { FiFolder, FiPlus, FiFilter } from 'react-icons/fi';

const EmptyState = ({ 
  title = 'No Leads Registered', 
  description = 'Start tracking your pipeline by adding your first lead to the CRM database.', 
  ctaText = 'Add Client Lead', 
  onCtaClick,
  mode = 'create' // 'create' or 'search'
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center max-w-xl mx-auto flex flex-col items-center justify-center space-y-4">
      {/* SVG Graphics / Illustration */}
      <div className="bg-slate-950 p-4 rounded-full border border-slate-800 text-slate-500 relative flex items-center justify-center">
        {mode === 'search' ? (
          <FiFilter className="h-10 w-10 text-slate-500" />
        ) : (
          <FiFolder className="h-10 w-10 text-brand-500" />
        )}
      </div>

      {/* Helpful Description */}
      <div className="space-y-1.5">
        <h4 className="text-base font-bold text-white tracking-tight">{title}</h4>
        <p className="text-xs text-slate-400 max-w-md leading-relaxed mx-auto">
          {description}
        </p>
      </div>

      {/* CTA Button */}
      {onCtaClick && (
        <button
          onClick={onCtaClick}
          className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white text-xs font-semibold px-4.5 py-2.5 rounded-lg shadow-sm transition mt-2"
        >
          {mode === 'search' ? (
            <FiFilter className="h-3.5 w-3.5" />
          ) : (
            <FiPlus className="h-3.5 w-3.5" />
          )}
          <span>{ctaText}</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
