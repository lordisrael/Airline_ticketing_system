    const request = require("request");
    require("dotenv").config();
    const MySecretkey = process.env.PAYSTACK_SECRET_KEY

    const initializePayment = (form, myCallback) => {
        const options = {
          url: "https://api.paystack.co/transaction/initialize",
          headers: {
            Authorization: `Bearer ${MySecretkey}`,
            content_type: "application/json",
            "cache-control": "no-cache",
          },
          form,
        };

        const callback = (error, response, body) => {
            console.log("Response body:", body);
            return myCallback(error, body)
        }
        request.post(options, callback)
    }
    
    const verifyPayment = (ref, myCallback) => {
        const options = {
          url: "https://api.paystack.co/transaction/verify/"+encodeURIComponent(ref),
          headers: {
            authorization: `Bearer ${MySecretkey}`,
            content_type: "application/json",
            "cache-control": "no-cache",
          },
        };
        const callback = (error, response, body) => {
            return myCallback(error, body)
        }
        request(options, callback)
    }



module.exports = { initializePayment, verifyPayment };

