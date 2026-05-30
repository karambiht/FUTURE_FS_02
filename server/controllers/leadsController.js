const Lead = require('../models/Lead');

// @desc    Get all leads
// @route   GET /api/leads
// @access  Public
const getLeads = async (req, res) => {
  try {
    // Retrieve all leads from the database, sorted with newest leads first
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error.message);
    res.status(500).json({ message: 'Server Error: Unable to fetch leads' });
  }
};

// @desc    Create a new lead
// @route   POST /api/leads
// @access  Public
const createLead = async (req, res) => {
  try {
    const { name, email, company, source, status, notes, followUpDate } = req.body;

    // Simple validation of required fields
    if (!name || !email || !company || !source) {
      return res.status(400).json({ message: 'Please provide all required fields: name, email, company, source' });
    }

    // Create the new lead document
    const newLead = new Lead({
      name,
      email,
      company,
      source,
      status: status || 'New',
      notes: notes || '',
      followUpDate: followUpDate || null
    });

    // Save lead to database
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    console.error('Error creating lead:', error.message);
    // Handle database validation or duplicate errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server Error: Unable to create lead' });
  }
};

// @desc    Update a lead
// @route   PUT /api/leads/:id
// @access  Public
const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, company, source, status, notes, followUpDate } = req.body;

    // Check if the lead exists first
    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Update fields if provided in request body
    if (name !== undefined) lead.name = name;
    if (email !== undefined) lead.email = email;
    if (company !== undefined) lead.company = company;
    if (source !== undefined) lead.source = source;
    if (status !== undefined) lead.status = status;
    if (notes !== undefined) lead.notes = notes;
    
    // Explicitly handle empty or undefined followUpDate
    if (followUpDate !== undefined) {
      lead.followUpDate = followUpDate ? new Date(followUpDate) : null;
    }

    // Save the updated lead document (triggers Schema validation)
    const updatedLead = await lead.save();
    res.status(200).json(updatedLead);
  } catch (error) {
    console.error('Error updating lead:', error.message);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server Error: Unable to update lead' });
  }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Public
const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Perform database deletion
    await Lead.findByIdAndDelete(id);
    res.status(200).json({ id, message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error.message);
    res.status(500).json({ message: 'Server Error: Unable to delete lead' });
  }
};

module.exports = {
  getLeads,
  createLead,
  updateLead,
  deleteLead
};
