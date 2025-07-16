// server/server.js

require('dotenv').config();
const express = require('express');
const cors    = require('cors');          // ← only one import
const mongoose= require('mongoose');
const path    = require('path');

const app = express();

// CORS: whitelist your Vercel origins
const allowedOrigins = [
  'https://property-maintenance-pwa.vercel.app',
  'https://property-maintenance-pwa-2lng.vercel.app'
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS policy: origin ${origin} not allowed`));
  },
  credentials: true
}));

// Body parser — allow large Base64 uploads
app.use(express.json({ limit: '10mb' }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mount routes
app.use('/api/users',     require('./routes/users'));
app.use('/api/jobs',      require('./routes/jobs'));
app.use('/api/messages',  require('./routes/messages'));
+app.use('/api/payments', require('./routes/payments'));

// … any other routes …

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
