var express = require("express");
var router = express.Router();
const verifyUser = require("../middlewares/verifyUser");
const { makePayment, paymentFailure, paymentSuccess } = require("../controllers/payment");

router.post('/order/payment', verifyUser, makePayment);
router.get('/order/payment/cancel', paymentFailure);
router.get('/order/payment/success', paymentSuccess);

module.exports = router;