// server/routes/jobs.js

const express = require('express');
const multer  = require('multer');
const path    = require('path');
const Job     = require('../models/Job');
const router  = express.Router();

// ─── Multer storage setup ───────────────────────────────────────────────────

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// ─── GET all jobs (with poster flattened + tenant fields) ────────────────────

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate(
        'poster',
        'fullName phone companyName userType callOutCharge'
      )
      .sort({ createdAt: -1 });

    const jobsWithAllInfo = jobs.map(job => {
      const j = job.toObject();

      // flatten poster info
      j.posterName    = j.poster.fullName;
      j.posterPhone   = j.poster.phone;
      j.callOutCharge = j.poster.callOutCharge;

      // tenantName & tenantPhone are already top-level from your schema
      return j;
    });

    res.json(jobsWithAllInfo);
  } catch (err) {
    console.error('Fetch jobs error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── POST a new job (with tenant & schedule info) ───────────────────────────

router.post(
  '/',
  upload.array('media', 5),
  async (req, res) => {
    try {
      const {
        category,
        description,
        address,
        postcode,
        tenantName,
        tenantPhone,
        urgency,
        scheduledFor
      } = req.body;

      // req.user.id must come from your auth middleware
      const poster = req.user.id;

      const media = req.files.map(f => `/uploads/${f.filename}`);

      const job = new Job({
        poster,
        category,
        description,
        address,
        postcode,
        media,
        tenantName,
        tenantPhone,
        urgency,
        scheduledFor: urgency === 'Scheduled'
          ? new Date(scheduledFor)
          : null
      });

      await job.save();
      res.json(job);
    } catch (err) {
      console.error('Create job error:', err);
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
