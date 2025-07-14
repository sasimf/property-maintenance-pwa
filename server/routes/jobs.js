// server/routes/jobs.js

const express = require('express');
const multer = require('multer');
const Job = require('../models/Job');

const router = express.Router();

// Configure multer to store uploads in /uploads
const upload = multer({ dest: 'uploads/' });

// POST /api/jobs
// Expects FormData with fields + files under key "media"
router.post('/', upload.array('media', 10), async (req, res) => {
  try {
    const {
      poster,
      tenantName,
      tenantPhone,
      category,
      description,
      urgency,
      scheduledFor,
      address,
      postcode,
    } = req.body;

    // Build job object
    const job = new Job({
      poster,
      tenantName,
      tenantPhone,
      category,
      description,
      media: req.files.map(f => f.path),  // store file paths
      urgency,
      scheduledFor: scheduledFor || undefined,
      address,
      postcode,
    });

    await job.save();
    return res.json(job);
  } catch (err) {
    console.error('Create job error:', err);
    return res
      .status(500)
      .json({ error: 'Server error during job creation' });
  }
});

// GET /api/jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    return res.json(jobs);
  } catch (err) {
    console.error('Fetch jobs error:', err);
    return res
      .status(500)
      .json({ error: 'Server error fetching jobs' });
  }
});

module.exports = router;
