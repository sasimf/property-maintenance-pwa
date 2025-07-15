const express = require('express');
const fs = require('fs');
const path = require('path');
const Job = require('../models/Job');

const router = express.Router();

// POST /api/jobs
// Expects JSON with fields plus optional Base64 media array
router.post('/', async (req, res) => {
  try {
    const {
      poster,
      tenantName,
      tenantPhone,
      category,
      description,
      media = [],
      urgency,
      scheduledFor,
      address,
      postcode,
    } = req.body;

    // Validate required fields
    if (!poster || !tenantName || !tenantPhone || !category || !address || !postcode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Ensure uploads directory exists
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    // Process Base64 media into files
    const savedFiles = media.map((dataUrl, idx) => {
      const [meta, base64] = dataUrl.split(',');
      const match = meta.match(/data:(image|video)\/(.*?);/);
      const ext = match ? match[2] : 'png';
      const filename = `job_${Date.now()}_${idx}.${ext}`;
      const filepath = path.join(uploadsDir, filename);
      fs.writeFileSync(filepath, Buffer.from(base64, 'base64'));
      return `/uploads/${filename}`;
    });

    const job = new Job({
      poster,
      tenantName,
      tenantPhone,
      category,
      description,
      media: savedFiles,
      urgency,
      scheduledFor: scheduledFor || undefined,
      address,
      postcode,
    });

    await job.save();
    return res.json(job);
  } catch (err) {
    console.error('Create job error:', err);
    return res.status(500).json({ error: err.message, stack: err.stack });
  }
});

// GET /api/jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    return res.json(jobs);
  } catch (err) {
    console.error('Fetch jobs error:', err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
