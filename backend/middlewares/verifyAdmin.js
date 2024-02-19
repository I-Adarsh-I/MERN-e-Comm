var express = require("express");
var userModel = require("../models/user_model");

const app = express();
app.use(express.json());

const verifyAdmin = (req,res,next) => {
    try {
        if(!req.user || !req.user.isAdmin){
            return res.status(403).json({ error: "Unauthorized: User is not an admin" });
        }
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
}

module.exports = verifyAdmin;