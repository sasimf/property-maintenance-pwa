const express=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/User');
const router=express.Router();

router.post('/register',async(req,res)=>{
  const {email,password,...rest}=req.body;
  const existing=await User.findOne({email});
  if(existing) return res.status(400).json({error:'Email in use'});
  const hash=await bcrypt.hash(password,10);
  const user=new User({...rest,email,passwordHash:hash});
  await user.save();
  res.json({message:'Registered'});
});

router.post('/login',async(req,res)=>{
  const {email,password}=req.body;
  const user=await User.findOne({email});
  if(!user) return res.status(400).json({error:'Invalid'});
  const ok=await bcrypt.compare(password,user.passwordHash);
  if(!ok) return res.status(400).json({error:'Invalid'});
  const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
  res.json({token,user:{fullName:user.fullName,email:user.email,userType:user.userType}});
});

module.exports=router;
