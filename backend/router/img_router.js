var express = require("express");
var multer = require("multer");
var router = express.Router();
const verifyUser = require("../middlewares/verifyUser");
const verifyAdmin = require("../middlewares/verifyAdmin");
const { upload } = require("../controllers/prodImg");

var uploader = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 50000000 }
});

router.post("/upload", uploader.single("file"), upload);

module.exports = router;