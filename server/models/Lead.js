const mongoose = require('mongoose');

// Mongoose schema definition for a Client Lead
const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Lead name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Lead email is required'],
    trim: true,
    lowercase: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  source: {
    type: String,
    required: [true, 'Lead source is required'],
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['New', 'Contacted', 'Converted'],
    default: 'New'
  },
  notes: {
    type: String,
    default: ''
  },
  followUpDate: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the Mongoose model so it can be used in other parts of the application
module.exports = mongoose.model('Lead', leadSchema);
