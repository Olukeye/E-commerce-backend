const User = require('../model/user')
const braintree = require('braintree')
require('dotenv').config()

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

// const gateway = new braintree.BraintreeGateway({
//     environment: braintree.Environment.Sandbox,
//     merchantId: "rmjzqh869rk6j66n",
//     publicKey: "p738nsht93vcq72k",
//     privateKey: "0558b8558f45a950ed9953a3dd32d0e2"
// });

exports.generateToken = (_req, res) => {
    gateway.clientToken.generate({}, function(err, response){
        if (err) {
            res.status(500).send(err)
        } else {
            res.send(response);
        }
    });
};
