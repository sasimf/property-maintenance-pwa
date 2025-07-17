const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
  poster:        { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category:      { type: String, required: true },
  description:   { type: String, required: true },
  address:       { type: String, required: true },
  postcode:      { type: String, required: true },
  media:         [String],
  tenantName:    String,
  tenantPhone:   String,
  urgency:       { type: String, enum: ['Immediate','Scheduled'], required: true },
  scheduledFor:  Date,
  createdAt:     { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);
