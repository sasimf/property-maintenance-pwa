// server/models/User.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName:     { type: String, required: true },
  companyName:  { type: String },                      // optional
  address:      { type: String, required: true },
  postcode:     { type: String, required: true },
  phone:        { type: String, required: true },
  email:        { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },

  userType:     { 
    type: String, 
    enum: ['Landlord','Homeowner','LettingAgent','Contractor','Company'], 
    required: true 
  },

  expertise:    { 
    type: [String], 
    default: [] 
  },

  callOutCharge: { 
    type: Number, 
    required: function() { 
      return ['Contractor','Company'].includes(this.userType); 
    }, 
    default: 0 
  },

  createdAt:    { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
