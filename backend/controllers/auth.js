var express = require("express");
var mongoose = require("mongoose");
var userModel = require('../models/user_model')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

module.exports.signupHandler = async(req,res) => {
    const { name, email, password, isAdmin } = req.body;
    try {
      const isExistingUser = await userModel.findOne({ email });
      if (isExistingUser) {
        res.status(400).json({ error: "User already exists" });
      } else {
        const hashedPass = await bcrypt.hash(password, 12);
        const newUser = await userModel.create({
          name,
          email,
          password: hashedPass,
          isAdmin
        });
        console.log("New user created: ", newUser);
        res.status(200).json({ message: "User resgistered successfully!" });
      }
    } catch (err) {
      console.log("error while signing up: ", err);
    }
}

module.exports.loginHandler = async(req,res) => {
    const { email, password } = req.body;
    try {
      const existingUser = await userModel.findOne({ email });
      if (!existingUser) {
        return res.status(404).json({ error: "User not registered!" });
      }
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordCorrect) {
        return res.status(401).json({ error: "Password is incorrect" });
      }
  
      const token = jwt.sign({ _id:existingUser._id, email: existingUser.email }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      return res.status(200).json({ message: "User logged in successfully", user: {existingUser}, token:{token} });
    } catch (err) {
      console.error("Error while logging in: ", err);
      return res.status(500).json({ error: "Internal server error" });
    }
}