var jwt = require("jsonwebtoken");
var express = require("express");
var userModel = require("../models/user_model");

const app = express();
app.use(express.json());

const verifyUser = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
          return res.status(401).json({ error: "User not logged in" });
        }
        const token = authorization.replace("Bearer ", "");
    
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
          if (err) {
            console.log(err);
          }
          const { _id } = payload;
          const userInDb = await userModel.findById(_id);
    
          if (!userInDb) {
            return res.status(401).json({ error: "User not logged in" });
          }
          req.user = userInDb;
          next();
        });
      } catch (err) {
        console.log(err)
        res.status(500).json({error:"Internal server error"});
      }
};

module.exports = verifyUser;
