var express = require('express');
var router = express.Router();
const { loginHandler, signupHandler } = require("../controllers/auth");
const verifyUser = require('../middlewares/verifyUser');
const verifyAdmin = require('../middlewares/verifyAdmin');
const { getAllProfiles, findOneUser, removeUser, updateDetails } = require('../controllers/profiles');

router.post('/login', loginHandler);
router.post('/signup', signupHandler);
router.get('/allusers', verifyUser, verifyAdmin, getAllProfiles )
router.get('/user/:userId', verifyUser, verifyAdmin, findOneUser)
router.delete('/removeuser/:userId',verifyUser, verifyAdmin, removeUser);
router.put('/userinfoupdate', verifyUser, updateDetails);

module.exports = router;