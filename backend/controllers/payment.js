var paypal = require("paypal-rest-sdk");
var express = require("express");

paypal.configure({
  'mode': process.env.MODE,
  'client_id': process.env.CLIENT_ID,
  'client_secret': process.env.CLIENT_SECRET,
});

module.exports.makePayment = async(req,res) => {
    const { items, totalPrice } = req.body;
    try {
        var create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/paymentsuccess",
                "cancel_url": "http://localhost:3000/paymentfailure"
            },
            "transactions": [{
                "item_list": {
                    "items": items.map(item => ({
                        "name": item.name,
                        "price": item.price,
                        "currency": "USD",
                        "quantity": item.quantity
                    }))
                },
                "amount": {
                    "currency": "USD",
                    "total": totalPrice
                },
                "description": "Payment made by user"
            }]
        };

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for( let i=0; i<payment.links.length;i++){
                    if(payment.links[i].rel === 'approval_url'){
                        res.json({ approvalUrl: payment.links[i].href });
                    }
                }
            }
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.paymentSuccess = async(req,res) => {
    try {
        console.log("Payment successful");
        res.status(200).json({message:'Payment successful'})
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
}
 
module.exports.paymentFailure = async(req,res) => {
    try {
        console.log("Payment failed");
        res.status(200).json({message:'Payment failed'})
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
}
 
 
