const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Job = require('../models/Job');
const User = require('../models/User');
const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// configure your SMTP settings via .env
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

router.post('/:jobId', async (req, res) => {
  try {
    const { contractorId, callOutAmount } = req.body;
    const job = await Job.findById(req.params.jobId).populate('poster');
    if (!job) return res.status(404).json({ error: 'Job not found' });

    const booking = await Booking.create({
      job: job._id,
      contractor: contractorId,
      paid: true,
      callOutAmount
    });

    let systemUser = await User.findOne({ email: 'system@heydave.co.uk' });
    if (!systemUser) {
      systemUser = await User.create({
        fullName: 'HeyDave.co.uk',
        email: 'system@heydave.co.uk',
        passwordHash: 'SYSTEM',
        userType: 'System'
      });
    }
    await Message.create({
      job: job._id,
      sender: systemUser._id,
      message: 'Call-out charge has been paid. Please proceed to visit the job as arranged.'
    });

    const contractor = await User.findById(contractorId);
    await transporter.sendMail({
      from: '"HeyDave.co.uk" <noreply@heydave.co.uk>',
      to: contractor.email,
      subject: 'Call-out Charge Paid – Please Visit Job',
      text: `
Hello ${contractor.fullName},

The call-out charge of £${callOutAmount.toFixed(2)} for Job "${job.description}" has been paid.

Please proceed with the visit as arranged with ${job.poster.fullName} (${job.poster.phone}).

Thank you,
HeyDave.co.uk
`
    });

    res.json({ success: true, bookingId: booking._id });
  } catch (err) {
    console.error('Booking/payment error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
