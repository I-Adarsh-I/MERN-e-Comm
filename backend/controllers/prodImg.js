var express = require("express");
var multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'E-commerce',
    });

    const imageUrl = result.secure_url;

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { upload };