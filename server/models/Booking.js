const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
  job:           { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  contractor:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
  paid:          { type: Boolean, required: true },
  callOutAmount: { type: Number, required: true },
  paidAt:        { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
