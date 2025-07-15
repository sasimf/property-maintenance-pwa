// server/models/Job.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
  poster: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tenantName: { type: String, required: true },
  tenantPhone: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  media: { type: [String], default: [] },
  urgency: { type: String, enum: ['Immediate', 'Scheduled'], default: 'Scheduled' },
  scheduledFor: { type: Date },
  address: { type: String, required: true },
  postcode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Export the Mongoose model
module.exports = mongoose.model('Job', jobSchema);
