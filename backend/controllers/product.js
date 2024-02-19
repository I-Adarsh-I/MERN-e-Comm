var productModel = require("../models/product_model");

//Get all products
module.exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await productModel.find();
    res.status(200).json({ products: allProducts });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.log(err);
  }
};

//Get single  product
module.exports.getSingleProducts = async (req, res) => {
  try {
    const SingleProducts = await productModel.findOne({
      _id: req.params.productId,
    });
    res.status(200).json({ products: SingleProducts });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.log(err);
  }
};

//Update existing product
module.exports.updateProduct = async (req, res) => {
  try {
    const { productId, newDescription, newPrice } = req.body;
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      {
         description: newDescription,
         price: newPrice
      },
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({message: 'Producted details updated', productDetails: updatedProduct});
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.log(err)
  }
};

// Create new product
module.exports.addNewProduct = async (req, res) => {
  try {
    const { image, name, description, price } = req.body;

    if(!image || !name || !description || !price){
      res.status(400).json({error: 'One or more fields are empty'});
    }

    req.user.password = undefined;
    const productAdded = await productModel.create({
      image,
      name,
      description,
      price,
      user: req.user,
    });
    res
      .status(201)
      .json({ message: "New product added", productDetails: productAdded });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.log(err);
  }
};

//Delete existing product
module.exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const isProductExists = await productModel.findOne({ _id: productId });
    if (!isProductExists) {
      res.status(404).json({ error: "Product does not exist" });
    }
    const deletedProduct = await productModel.deleteOne({ _id: productId });
    res.status(200).json({ message: "Product removed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.log(err);
  }
};
