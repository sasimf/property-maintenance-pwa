const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  fullName:String, companyName:String, address:String, postcode:String,
  phone:String, email:{type:String,unique:true}, passwordHash:String,
  userType:String, expertise:[String], callOutCharge:Number,
  createdAt:{type:Date,default:Date.now}
});
module.exports = mongoose.model('User',UserSchema);