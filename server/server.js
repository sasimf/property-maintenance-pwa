require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

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

app.use(express.json({ limit: '10mb' }));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/users', require('./routes/users'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/bookings', require('./routes/bookings'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 5000;
// catch‐all 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
