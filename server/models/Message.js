const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  job:       { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  sender:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message:   { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
