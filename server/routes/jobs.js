const express = require('express');
const multer  = require('multer');
const path    = require('path');
const Job     = require('../models/Job');
const router  = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('poster', 'fullName phone callOutCharge')
      .sort({ createdAt: -1 });

    const out = jobs.map(job => {
      const j = job.toObject();
      j.posterName    = j.poster.fullName;
      j.posterPhone   = j.poster.phone;
      j.callOutCharge = j.poster.callOutCharge;
      return j;
    });

    res.json(out);
  } catch (err) {
    console.error('Fetch jobs error:', err);
    res.status(500).json({ error: err.message });
  }
});

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
