var express = require("express");
var userModel = require("../models/user_model");

//Get all users
module.exports.getAllProfiles = async (req, res) => {
  try {
    const allUser = await userModel.find().select("-password");
    if (allUser) {
      return res.status(200).json({ users: allUser });
    }
  } catch (err) {
    console.log(err);
  }
};

//Remove a user
module.exports.removeUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }

    const deletedUser = await userModel.deleteOne({ _id: userId });
    res
      .status(200)
      .json({ message: "User removed successfully", deletedUser: deletedUser });
  } catch (err) {
    console.log(err);
  }
};

// Find a user with userID
module.exports.findOneUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findOne({ _id: userId }).select("-password");
    if (!user) {
      res.status(404).json({ error: "User does not exist" });
    } else {
      res.status(200).json({ user: user });
    }
  } catch (err) {
    console.log(err);
  }
};

// Update user details
module.exports.updateDetails = async (req, res) => {
  try {
    const userDetails = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
      },
      {
        new: true,
      }
    );
    if (!userDetails) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user: userDetails });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.log(err);
  }
};
