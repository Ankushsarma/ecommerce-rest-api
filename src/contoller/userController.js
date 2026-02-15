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



// ================= ADD ADDRESS =================
// Private
exports.addAddress = async (req, res) => {
  try {
    const { address, city, state, pincode, country, isDefault } = req.body;

    const userId = req.user.id; // from auth middleware (JWT)

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // If user sets new default address → remove old default
    if (isDefault) {
      await Address.updateMany(
        { user: userId, isDefault: true },
        { isDefault: false }
      );
    }

    const newAddress = await Address.create({
      user: userId,
      address,
      city,
      state,
      pincode,
      country,
      isDefault: isDefault || false,
    });

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      address: newAddress,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL ADDRESSES =================
// Private
exports.getAddress = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const addresses = await Address.find({ user: userId }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    res.json({
      success: true,
      total: addresses.length,
      addresses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.json({
      success: true,
      message: "Address deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.setDefaultAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    // Remove old default
    await Address.updateMany(
      { user: userId, isDefault: true },
      { isDefault: false }
    );

    const address = await Address.findOneAndUpdate(
      { _id: addressId, user: userId },
      { isDefault: true },
      { new: true }
    );

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.json({
      success: true,
      message: "Default address updated",
      address,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
