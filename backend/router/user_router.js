var express = require('express');
var router = express.Router();
const { loginHandler, signupHandler } = require("../controllers/auth");
const verifyUser = require('../middlewares/verifyUser');

router.post('/login', loginHandler);
router.post('/signup', signupHandler);

module.exports = router;