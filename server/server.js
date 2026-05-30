const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const leadsRoutes = require('./routes/leads');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/leads', leadsRoutes);

// Simple Health Check/Welcome Endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to FUTURE_FS_02 Mini CRM API Server' });
});

// 404 Route handler for API endpoints
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: `API route ${req.originalUrl} not found` });
});

// Configure Port
const PORT = process.env.PORT || 5000;

// Configure Database Connection with Fallback
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mini-crm';

console.log('Connecting to database...');

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
    // Start listening for requests once DB connection is established
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB database connection error:', err.message);
    console.log('Please ensure your MongoDB Atlas URI is correct or a local MongoDB service is running.');
    process.exit(1); // Exit process with failure
  });
