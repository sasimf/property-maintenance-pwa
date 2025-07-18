const express = require('express');
const Message = require('../models/Message');
const router  = express.Router();

router.get('/:jobId', async (req, res) => {
  try {
    const msgs = await Message.find({ job: req.params.jobId })
      .populate('sender', 'fullName')
      .sort({ createdAt: 1 });

    const out = msgs.map(m => ({
      _id:        m._id,
      message:    m.message,
      senderName: m.sender.fullName,
      createdAt:  m.createdAt
    }));

    res.json(out);
  } catch (err) {
    console.error('Fetch messages error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/:jobId', async (req, res) => {
  try {
    const { message, sender } = req.body;
    if (!message || !sender) {
      return res.status(400).json({ error: 'Missing message or sender' });
    }
    const msg = new Message({
      job:     req.params.jobId,
      sender,
      message
    });
    await msg.save();
    const populated = await msg.populate('sender', 'fullName');
    res.json({
      _id:        populated._id,
      message:    populated.message,
      senderName: populated.sender.fullName,
      createdAt:  populated.createdAt
    });
  } catch (err) {
    console.error('Create message error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
