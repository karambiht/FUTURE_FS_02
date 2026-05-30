import React from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

const DeleteConfirmation = ({ isOpen, onClose, onConfirm, leadName = '' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 text-red-400">
            <FiAlertTriangle className="h-5 w-5" />
            <h3 className="font-bold text-white">Delete Lead</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <p className="text-sm text-slate-300 leading-relaxed">
            Are you sure you want to delete lead <strong className="text-white font-semibold">"{leadName}"</strong>? 
            This action is permanent and cannot be undone. All notes, status tracking, and follow-up reminders linked to this lead will be completely erased.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-800 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-350 hover:bg-slate-800 rounded-lg border border-slate-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 text-sm font-semibold bg-red-600 hover:bg-red-700 rounded-lg text-white shadow-sm transition"
          >
            Delete Lead
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
