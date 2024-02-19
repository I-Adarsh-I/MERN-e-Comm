var express = require("express");
var router = express.Router();
const verifyUser = require("../middlewares/verifyUser");
const verifyAdmin = require("../middlewares/verifyAdmin");
const {
  addNewProduct,
  deleteProduct,
  getAllProducts,
  getSingleProducts,
  updateProduct,
} = require("../controllers/product");


router.post("/addproduct", verifyUser, verifyAdmin, addNewProduct);
router.delete(
  "/removeproduct/:productId",
  verifyUser,
  verifyAdmin,
  deleteProduct
);
router.put("/updateproduct", verifyUser, verifyAdmin,updateProduct);
router.get("/allProducts", verifyUser, getAllProducts);
router.get("/product/:productId", verifyUser, getSingleProducts);

module.exports = router;
