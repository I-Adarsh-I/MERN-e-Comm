var orderModel = require("../models/order_model");
var productModel = require("../models/product_model");

//Add items to order
module.exports.addItems = async (req, res) => {
  try {
    const {
      products,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid,
    } = req.body;

    if (products && products.length === 0) {
      res.status(404).json({ error: "No items added to order" });
    }
    req.user.password = undefined;
    const orderDetails = await orderModel.create({
      orderedBy: req.user,
      products,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid,
    });

    res
      .status(200)
      .json({ message: "Order successfull", items: orderDetails });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.log(err);
  }
};

//Get orders placed by user
module.exports.getMyOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ orderedBy: req.user._id }).populate('products', '_id name');

    res.status(200).json({ orders: orders });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.log(err);
  }
};

//Get order by id 
module.exports.getOrderById = async(req,res) => {
  try {
    const orderId = req.params.orderId
    const order = await orderModel.findOne({_id: orderId}).populate("orderedBy", "_id name email");
    if(!order) {
      res.status(404).json({error: 'Product not found'});
    }
    res.status(200).json({order: order});
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.log(err);
  }
}

//Get all orders - only admin can see all orders
module.exports.getAllOrders = async (req, res) => {
  try {
    const allOrders = await orderModel
      .find()
      .populate("products.product", "_id name")
      .populate("orderedBy", "_id name");

    res.status(200).json({ orders: allOrders });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.log(err);
  }
};
