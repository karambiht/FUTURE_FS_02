const express = require('express');
const router = express.Router();
const {
  getLeads,
  createLead,
  updateLead,
  deleteLead
} = require('../controllers/leadsController');

// Route for getting all leads and creating a new lead
router.route('/')
  .get(getLeads)
  .post(createLead);

// Route for updating and deleting a specific lead by MongoDB ObjectId
router.route('/:id')
  .put(updateLead)
  .delete(deleteLead);

module.exports = router;
