const express = require('express');
const fs = require('fs');
const path = require('path');
const Job = require('../models/Job');

const router = express.Router();

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

    if (!poster || !tenantName || !tenantPhone || !category || !address || !postcode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Ensure uploads folder exists
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

    // Process Base64 media
    const savedFiles = media.map((dataUrl, idx) => {
      // dataUrl format: "data:image/png;base64,AAA..."
      const [meta, base64] = dataUrl.split(',');
      const ext = meta.match(/data:image\/(.*?);/)[1] || 'png';
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
--- a/server/routes/jobs.js
+++ b/server/routes/jobs.js
@@ router.post('/', async (req, res) => {
-  } catch (err) {
-    console.error('Create job error:', err);
-    return res.status(500).json({ error: 'Server error during job creation' });
-  }
+  } catch (err) {
+    console.error('Create job error:', err);
+    // Return actual error message & stack for debugging (remove stack in prod)
+    return res.status(500).json({
+      error: err.message || 'Server error during job creation',
+      stack: err.stack
+    });
+  }


module.exports = router;
