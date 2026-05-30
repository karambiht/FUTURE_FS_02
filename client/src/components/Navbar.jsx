import React from 'react';
import { FiTrendingUp, FiActivity } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className="bg-slate-900 border-b border-slate-800/80 px-6 py-3.5 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3.5">
          <div className="bg-brand-500 text-white p-2 rounded-lg shadow-sm">
            <FiTrendingUp className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white">
                FUTURE_FS_02
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950 text-brand-400 border border-slate-800">
                Mini CRM
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">Client Lead Management System • Portfolio Edition</p>
          </div>
        </div>

        {/* Dashboard Status Info */}
        <div className="flex items-center space-x-5 text-xs text-slate-400 font-medium">
          <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-850">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] text-slate-400">Database Sync: Connected</span>
          </div>
          <div className="hidden md:flex items-center space-x-2 border-l border-slate-800 pl-5 text-slate-500">
            <FiActivity className="text-slate-500" />
            <span className="text-[10px]">Workspace v1.2</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
