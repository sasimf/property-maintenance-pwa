// server/routes/bookings.js

const express    = require('express');
const router     = express.Router();
const Booking    = require('../models/Booking');
const Job        = require('../models/Job');
const User       = require('../models/User');
const nodemailer = require('nodemailer');

// configure your SMTP transporter (example uses Gmail)
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post('/:jobId', async (req, res) => {
  try {
    const jobId   = req.params.jobId;
    const { userId, amount } = req.body;

    // Save booking record
    const booking = await Booking.create({
      job:       jobId,
      poster:    userId,
      amountPaid: amount,
      paidAt:    new Date()
    });

    // Update job status & populate contractor email/name
    const job = await Job.findByIdAndUpdate(
      jobId,
      { status: 'CallOutPaid' },
      { new: true }
    ).populate('contractor', 'email fullName description');

    // Send in‑app “HeyDave.co.uk” message
    await fetch(`${process.env.BACKEND_URL}/api/messages/${jobId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `HeyDave.co.uk: the £${amount} call‑out charge has been paid. Please visit as arranged.`
      })
    });

    // Email the contractor
    await transporter.sendMail({
      from:    '"HeyDave.co.uk" <no-reply@heydave.co.uk>',
      to:      job.contractor.email,
      subject: 'Call‑out Charge Paid – Please Visit Job',
      text: `
Hi ${job.contractor.fullName},

Your call‑out charge of £${amount} has just been paid by the client for job "${job.description}".
Please visit the property as per your arrangement.

Thanks,
The HeyDave.co.uk Team
`
    });

    res.json({ booking, job });
  } catch (err) {
    console.error('Booking/payment error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
