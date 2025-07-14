require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// CORS configuration to allow front-end origins
aapp.use(cors({
  origin: [
    'https://property-maintenance-pwa.vercel.app',
    'https://property-maintenance-pwa-2lng.vercel.app'
  ],
  credentials: true
}));

// Increase JSON payload limit to handle Base64 media uploads
app.use(express.json({ limit: '10mb' }));

// Connect to MongoDB Atlas
a mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/jobs', require('./routes/jobs'));
// ... mount other route files similarly ...

// Health check endpoint
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
