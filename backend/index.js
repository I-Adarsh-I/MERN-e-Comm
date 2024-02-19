require("dotenv").config();
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
const router = require("./router/user_router");
const productRouter = require('./router/product_router')
const orderRouter = require('./router/order_router')
const paymentRouter = require('./router/payment_router')
var app = express();

const corsConfiguration = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
};

app.use(cors(corsConfiguration));
app.use(express.json());

app.use(router);
app.use(productRouter);
app.use(orderRouter);
app.use(paymentRouter);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to DB");
    app.listen(process.env.PORT, () => {
        console.log(`Server has started on PORT: ${process.env.PORT}`);
    })
  } catch (err) {
    console.log("Error while connecting to server -", err);
  }
};

startServer();