const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const generateToken = require("../utils/generateToken");



// register

exports.register = async(req, res) => {
 try{
  const {name,email,password} =req.body;

  const exists=await User.findOne({email});
  if(exists){
    return res.status(400).json({message:"user already exists"});
  }

  const User=await User.create({name,email,password});
  const token = generateToken(User._id);

  res.status(201).json({
    message:"user register",
    token,
    userId:User._id
  })
 } catch(error){
  res.status(500).json({message:error.message})
 }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.json({
      message: "Login successful",
      token,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.forgotPassword = (req, res) => {
  res.json({ message: 'forgotPassword controller' });
};

exports.resetPassword = (req, res) => {
  res.json({ message: 'resetPassword controller' });
};