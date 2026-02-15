const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const Address = require("../models/addressModule")


// ================= GET MY PROFILE =================
// Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= UPDATE PROFILE =================
// Private
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Profile updated",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= CHANGE PASSWORD =================
// Private
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select("+password");

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch)
      return res.status(400).json({ message: "Old password incorrect" });

    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= GET ALL USERS =================
// Admin
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      total: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= GET SINGLE USER =================
// Admin
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= UPDATE USER ROLE =================
// Admin
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.json({
      success: true,
      message: "User role updated",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= DELETE USER =================
// Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    await user.deleteOne();

    res.json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Address
exports.addAddress = async (req, res) => {
  try {
    const { address, city, state, pincode, country } = req.body;

    // Example logic (modify based on your DB / User model)
    const user = req.user; // assuming auth middleware sets req.user

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newAddress = {
     ...req.body
    };

    // If using MongoDB User model:
    user.addresses = user.addresses || [];
    user.addresses.push(newAddress);

    await user.save();

    res.status(201).json({
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get All Addresses
exports.getAddress = async (req, res) => {
  try {
    const user = req.user; // from auth middleware

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.json({
      addresses: user.addresses || [],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
