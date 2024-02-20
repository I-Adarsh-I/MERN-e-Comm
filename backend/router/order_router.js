var express = require("express");
var router = express.Router();
const verifyUser = require("../middlewares/verifyUser");
const verifyAdmin = require("../middlewares/verifyAdmin");
const {
  addItems,
  getAllOrders,
  getMyOrders,
  getOrderById,
  deleteSingleOrder,
} = require("../controllers/order");

router.post("/placeorder", verifyUser, addItems);
router.get("/orders", verifyUser, getMyOrders);
router.get("/allorders", verifyUser, verifyAdmin, getAllOrders);
router.get("/orders/:orderId", verifyUser, getOrderById);
router.delete("/order/:orderId", verifyUser, deleteSingleOrder);

module.exports = router;
