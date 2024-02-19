var mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = mongoose.Schema({
  customerName: {
    type: ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  reviewText: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const productModel = mongoose.model('product', productSchema);
module.exports = productModel;
