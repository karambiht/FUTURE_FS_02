import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import SearchBar from './components/SearchBar';
import StatusFilter from './components/StatusFilter';
import LeadTable from './components/LeadTable';
import LeadForm from './components/LeadForm';
import DeleteConfirmation from './components/DeleteConfirmation';
import FollowUpWidget from './components/FollowUpWidget';
import ActivityPanel from './components/ActivityPanel';
import EmptyState from './components/EmptyState';
import { leadsService } from './services/api';
import { FiPlus, FiAlertCircle, FiRefreshCw, FiDownload } from 'react-icons/fi';

function App() {
  // Core MERN CRM states
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Form Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [selectedLead, setSelectedLead] = useState(null);

  // Delete Modal states
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);

  // Recent Activity Log state (Loaded from localStorage)
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('crm_activities');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch leads on mount
  useEffect(() => {
    fetchLeads();
  }, []);

  // API Call: Fetch all leads from MongoDB Atlas/Local
  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await leadsService.getLeads();
      setLeads(data);
    } catch (err) {
      console.error('Failed to fetch leads:', err);
      setError('Unable to link database. Make sure your local MongoDB service or Atlas connection is online.');
    } finally {
      setLoading(false);
    }
  };

  // Helper to append a CRUD action in localStorage activity log
  const logActivity = (type, message) => {
    const newAct = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: Date.now()
    };
    setActivities((prev) => {
      const updated = [newAct, ...prev].slice(0, 40); // cap to latest 40 items
      localStorage.setItem('crm_activities', JSON.stringify(updated));
      return updated;
    });
  };

  // Clear local activity records
  const handleClearActivities = () => {
    setActivities([]);
    localStorage.removeItem('crm_activities');
  };

  // API Call: Create or Update Client Lead
  const handleFormSubmit = async (formData) => {
    try {
      if (formMode === 'add') {
        const newLead = await leadsService.createLead(formData);
        // Prepend new lead so it shows immediately at the top
        setLeads((prev) => [newLead, ...prev]);
        logActivity('create', `Client "${newLead.name}" was added to company ${newLead.company}`);
      } else if (formMode === 'edit' && selectedLead) {
        const updatedLead = await leadsService.updateLead(selectedLead._id, formData);
        setLeads((prev) =>
          prev.map((lead) => (lead._id === selectedLead._id ? updatedLead : lead))
        );
        logActivity('update', `Details for client "${updatedLead.name}" were updated`);
      }
      setIsFormOpen(false);
      setSelectedLead(null);
    } catch (err) {
      console.error('Error submitting form:', err);
      alert(err.response?.data?.message || 'Failed to sync lead. Please review requirements.');
    }
  };

  // API Call: Direct inline quick status update from Table select badge
  const handleStatusChange = async (id, newStatus) => {
    const leadToUpdate = leads.find(l => l._id === id);
    if (!leadToUpdate) return;
    const oldStatus = leadToUpdate.status;

    try {
      // Optimistic UI update
      setLeads((prev) =>
        prev.map((lead) => (lead._id === id ? { ...lead, status: newStatus } : lead))
      );
      
      // Persist to database
      await leadsService.updateLead(id, { status: newStatus });
      logActivity('status', `Status of client "${leadToUpdate.name}" changed from ${oldStatus} to ${newStatus}`);
    } catch (err) {
      console.error('Error updating status:', err);
      fetchLeads(); // revert
      alert('Failed to update status. Restoring previous state.');
    }
  };

  // API Call: Delete CRM Client Lead
  const handleDeleteConfirm = async () => {
    if (!leadToDelete) return;
    try {
      await leadsService.deleteLead(leadToDelete._id);
      // Remove deleted lead from local state
      setLeads((prev) => prev.filter((lead) => lead._id !== leadToDelete._id));
      logActivity('delete', `Client "${leadToDelete.name}" was deleted from CRM records`);
      setIsDeleteOpen(false);
      setLeadToDelete(null);
    } catch (err) {
      console.error('Error deleting lead:', err);
      alert('Failed to delete lead. Please try again.');
    }
  };

  // CSV Exporter Feature
  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert('No leads available to export.');
      return;
    }

    // CSV structure headers
    const headers = ['Full Name', 'Email', 'Company', 'Source', 'Status', 'Notes', 'Follow-Up Date', 'Created Date'];

    // Map each lead into matching CSV rows
    const rows = leads.map(lead => [
      lead.name,
      lead.email,
      lead.company,
      lead.source,
      lead.status,
      lead.notes ? lead.notes.replace(/"/g, '""').replace(/\n/g, ' ') : '', // escape quotes and breaks
      lead.followUpDate ? new Date(lead.followUpDate).toISOString().split('T')[0] : 'None',
      new Date(lead.createdAt).toISOString().split('T')[0]
    ]);

    // Construct raw string
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${val}"`).join(','))
    ].join('\n');

    // Create browser trigger link to download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `FUTURE_FS_02_leads_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Open Form modal in Add Mode
  const triggerAddLead = () => {
  setFormMode('add');
  setSelectedLead(null);
  setIsFormOpen(true);
};

// Seed demo data with 5 leads
const seedDemoLeads = async () => {
  const demoLeads = [
    { name: 'John Smith', email: 'john.smith@example.com', company: 'Acme Corp', source: 'Website', status: 'New', notes: 'Initial contact made.', followUpDate: null },
    { name: 'Sarah Lee', email: 'sarah.lee@example.com', company: 'Beta Ltd', source: 'Referral', status: 'Contacted', notes: 'Follow-up scheduled.', followUpDate: new Date(Date.now() + 86400000).toISOString() },
    { name: 'Mike Davis', email: 'mike.davis@example.com', company: 'Gamma Inc', source: 'LinkedIn', status: 'New', notes: '', followUpDate: null },
    { name: 'Emma Wilson', email: 'emma.wilson@example.com', company: 'Delta Co', source: 'Event', status: 'Contacted', notes: 'Sent proposal.', followUpDate: new Date(Date.now() + 172800000).toISOString() },
    { name: 'David Chen', email: 'david.chen@example.com', company: 'Epsilon LLC', source: 'Instagram', status: 'New', notes: '', followUpDate: null }
  ];
  try {
    for (const lead of demoLeads) {
      const created = await leadsService.createLead(lead);
      setLeads(prev => [created, ...prev]);
    }
    logActivity('create', 'Demo leads seeded');
  } catch (e) {
    console.error('Demo seed error:', e);
  }
};

  // Open Form modal in Edit Mode
  const triggerEditLead = (lead) => {
    setFormMode('edit');
    setSelectedLead(lead);
    setIsFormOpen(true);
  };

  // Open Delete confirmation dialog
  const triggerDeleteLead = (lead) => {
    setLeadToDelete(lead);
    setIsDeleteOpen(true);
  };

  // Apply real-time query search and status filtering logic
  const filteredLeads = leads.filter((lead) => {
    // 1. Status Filter matching
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    
    // 2. Search query matching
    const normalizedQuery = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !normalizedQuery || 
      lead.name.toLowerCase().includes(normalizedQuery) || 
      lead.email.toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Main dashboard content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-7 flex flex-col gap-6.5">
        
        {/* Dynamic header summary */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Leads Dashboard</h2>
            <p className="text-slate-500 text-xs mt-1 font-bold uppercase tracking-wider">Track, organize and manage your client pipeline.</p>
          </div>
          <div className="flex items-center gap-2">
  <button
    onClick={triggerAddLead}
    className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white text-xs font-bold px-4.5 py-2.5 rounded-lg shadow-sm transition shrink-0 uppercase tracking-wider"
  >
    <FiPlus className="h-4 w-4 shrink-0" />
    <span>Add Client Lead</span>
  </button>
  <button
    onClick={seedDemoLeads}
    className="flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-xs font-bold px-4.5 py-2.5 rounded-lg shadow-sm transition shrink-0 uppercase tracking-wider"
  >
    Seed Demo Data
  </button>
</div>
        </div>

        {/* Dynamic metrics overview */}
        <StatsCards leads={leads} />

        {/* Two Column Desktop Layout (Spans 3 Left, Spans 1 Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Main leads database controller (Left side) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Search, filters, and Export actions aligned toolbar */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row justify-between items-center gap-4.5 shadow-sm mt-8">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              
              <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full md:w-auto justify-end shrink-0">
                <StatusFilter 
                  activeFilter={statusFilter} 
                  setActiveFilter={setStatusFilter} 
                  leads={leads}
                />
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-750 active:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold px-4 py-2.5 rounded-lg border border-slate-750 shadow-sm transition w-full sm:w-auto justify-center tracking-wide uppercase shrink-0"
                  title="Export entire database to CSV"
                >
                  <FiDownload className="h-4 w-4 shrink-0 text-slate-400" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Leads Table or customized Empty State widgets */}
            <div className="flex flex-col">
              {loading ? (
                /* Syncing Spinner */
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-16 flex flex-col items-center justify-center space-y-4 shadow-sm">
                  <FiRefreshCw className="h-7 w-7 text-brand-500 animate-spin" />
                  <p className="text-xs text-slate-400 font-medium">Syncing CRM records. Please wait...</p>
                </div>
              ) : error ? (
                /* Connection Failure Alert */
                <div className="bg-red-950/15 border border-red-900/20 rounded-xl p-8 flex flex-col items-center text-center max-w-lg mx-auto space-y-3 shadow-sm">
                  <FiAlertCircle className="h-9 w-9 text-red-400" />
                  <h4 className="text-sm font-bold text-white">Database Sync Failed</h4>
                  <p className="text-xs text-red-300 leading-relaxed font-medium">{error}</p>
                  <button 
                    onClick={fetchLeads}
                    className="mt-1 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold px-4 py-2 rounded-lg text-white border border-slate-750 transition"
                  >
                    Retry Connection
                  </button>
                </div>
              ) : filteredLeads.length === 0 ? (
                /* Polished Empty States */
                leads.length === 0 ? (
                  <EmptyState 
  title="No Leads Registered"
  description="No leads have been added yet. Create your first lead to start tracking client interactions, follow-ups, and conversions."
  ctaText="Add Your First Lead"
  onCtaClick={triggerAddLead}
  mode="create"
/>
                ) : (
                  <EmptyState 
                    title="No Leads Found"
                    description="We couldn't locate any client record matching your active query parameters. Clear searches to see all files."
                    ctaText="Clear Filters"
                    onCtaClick={() => { setSearchQuery(''); setStatusFilter('All'); }}
                    mode="search"
                  />
                )
              ) : (
                /* Main leads list grid */
                <LeadTable 
                  leads={filteredLeads}
                  onEdit={triggerEditLead}
                  onDelete={triggerDeleteLead}
                  onStatusChange={handleStatusChange}
                />
              )}
            </div>
          </div>

          {/* Sidebar widget deck (Right side) */}
          <div className="space-y-8 lg:col-span-1">
            {/* Upcoming schedules reminders widget */}
            <FollowUpWidget 
              leads={leads} 
              onEditLead={triggerEditLead} 
            />
            {/* localStorage CRUD logger activity panel */}
            <ActivityPanel 
              activities={activities} 
              onClear={handleClearActivities} 
            />
          </div>
        </div>
      </main>

      {/* Forms Overlay Modal (Add / Edit client records) */}
      <LeadForm 
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedLead(null);
        }}
        onSubmit={handleFormSubmit}
        mode={formMode}
        initialData={selectedLead}
      />

      {/* Delete Prompt Modal */}
      <DeleteConfirmation 
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setLeadToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        leadName={leadToDelete ? leadToDelete.name : ''}
      />

      {/* Page copyright footer */}
      <footer className="bg-slate-950 py-5 border-t border-slate-900/60 text-center text-[10px] text-slate-650 font-medium mt-auto">
  <p>© {new Date().getFullYear()} FUTURE_FS_02 Mini CRM. Developed strictly to satisfy primary internship program deliverables.</p>
</footer>
    </div>
  );
}

export default App;
