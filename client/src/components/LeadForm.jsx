import React, { useState, useEffect } from 'react';
import { FiX, FiInfo } from 'react-icons/fi';

const LeadForm = ({ isOpen, onClose, onSubmit, mode = 'add', initialData = null }) => {
  // Define local state matching Lead fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    source: 'Website', // Pre-bound default source dropdown option
    status: 'New',
    notes: '',
    followUpDate: ''
  });

  const [errors, setErrors] = useState({});

  // Sync form inputs when modal opens or editing data changes
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        // Format follow-up date to YYYY-MM-DD for standard date input binding
        let formattedDate = '';
        if (initialData.followUpDate) {
          try {
            formattedDate = new Date(initialData.followUpDate).toISOString().split('T')[0];
          } catch (e) {
            console.error('Invalid follow-up date format:', initialData.followUpDate);
          }
        }

        setFormData({
          name: initialData.name || '',
          email: initialData.email || '',
          company: initialData.company || '',
          source: initialData.source || 'Website',
          status: initialData.status || 'New',
          notes: initialData.notes || '',
          followUpDate: formattedDate
        });
      } else {
        // Reset to default empty form for adding a lead
        setFormData({
          name: '',
          email: '',
          company: '',
          source: 'Website', // Pre-bound default source dropdown option
          status: 'New',
          notes: '',
          followUpDate: ''
        });
      }
      setErrors({});
    }
  }, [isOpen, mode, initialData]);

  if (!isOpen) return null;

  // Handle standard input updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Run validation and submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate inputs
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.source.trim()) newErrors.source = 'Source is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Call submit handler with clean, formatted data
    onSubmit({
      ...formData,
      // Pass null instead of empty string if date is not selected
      followUpDate: formData.followUpDate ? new Date(formData.followUpDate) : null
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            {mode === 'edit' ? 'Edit Lead' : 'Add New Lead'}
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[75vh] space-y-4">
          
          {/* Grid fields: Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className={`w-full px-3 py-2 bg-slate-950 border rounded-lg text-sm text-slate-100 ${
                  errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-brand-500'
                }`}
              />
              {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                Email Address *
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={`w-full px-3 py-2 bg-slate-950 border rounded-lg text-sm text-slate-100 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-brand-500'
                }`}
              />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Grid fields: Company & Source */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                Company *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter company name"
                className={`w-full px-3 py-2 bg-slate-950 border rounded-lg text-sm text-slate-100 ${
                  errors.company ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-brand-500'
                }`}
              />
              {errors.company && <p className="text-xs text-red-400 mt-1">{errors.company}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                Lead Source *
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-brand-500 cursor-pointer"
              >
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="Event">Event</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Grid fields: Status & Follow-up Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-brand-500 cursor-pointer"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Converted">Converted</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide flex items-center gap-1">
                Follow-up Date
              </label>
              <input
                type="date"
                name="followUpDate"
                value={formData.followUpDate}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-brand-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
              Interaction Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Add meeting notes, follow-up reminders, or client requirements..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:border-brand-500 resize-none"
            ></textarea>
          </div>

          <div className="flex items-start gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800/80 text-xs text-slate-400">
            <FiInfo className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" />
            <p>Form fields marked with an asterisk (*) are mandatory. Status badges, follow-up dates, and note fields can be modified at any time.</p>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-350 hover:bg-slate-800 rounded-lg border border-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold bg-brand-500 hover:bg-brand-600 rounded-lg text-white shadow-sm transition"
            >
              {mode === 'edit' ? 'Update Lead' : 'Create Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
