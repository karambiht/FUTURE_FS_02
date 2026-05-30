import axios from 'axios';

// Create an Axios instance with base configuration
const API = axios.create({
  // Use environment variable if specified, otherwise fall back to local dev port
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Client API operations for Leads resource
export const leadsService = {
  // Fetch all leads
  getLeads: async () => {
    const response = await API.get('/leads');
    return response.data;
  },

  // Create a new lead
  createLead: async (leadData) => {
    const response = await API.post('/leads', leadData);
    return response.data;
  },

  // Update an existing lead's fields by ID
  updateLead: async (id, leadData) => {
    const response = await API.put(`/leads/${id}`, leadData);
    return response.data;
  },

  // Delete a lead by ID
  deleteLead: async (id) => {
    const response = await API.delete(`/leads/${id}`);
    return response.data;
  }
};
