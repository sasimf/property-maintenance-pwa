// server/routes/payments.js

const express = require('express');
const router  = express.Router();

// fake-payment for illustration — plug in Stripe/your gateway here
router.post('/callout', async (req, res) => {
  const { jobId, amount } = req.body;
  if (!jobId || !amount) {
    return res.status(400).json({ error: 'jobId and amount required' });
  }
  // TODO: integrate real payment gateway here...
  console.log(`Charging £${amount} for job ${jobId}`);
  // pretend it succeeds:
  return res.json({ success: true, charged: amount });
});

module.exports = router;
