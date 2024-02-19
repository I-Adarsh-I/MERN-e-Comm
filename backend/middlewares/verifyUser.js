const jwt = require("jsonwebtoken");
const express = require("express");
const userModel = require("../models/user_model");

const verifyUser = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ error: "Authorization header missing" });
        } else {
          
          const token = authorization.replace("Bearer ", "");
          
          jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
            if (err) {
                console.error("JWT verification error:", err);
                return res.status(401).json({ error: "Invalid or expired token" });
            }
            if (!payload || !payload._id) {
              return res.status(401).json({ error: "Invalid token payload" });
            }
            
            const { _id } = payload;
            const userInDb = await userModel.findById(_id);
            
            if (!userInDb) {
              return res.status(401).json({ error: "User not found" });
            }
            // Attach user object to request for further processing
            req.user = userInDb;
            next();
          });
        }
    } catch (err) {
        console.error("Error in verifyUser middleware:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = verifyUser;
