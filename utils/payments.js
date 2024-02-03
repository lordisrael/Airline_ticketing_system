const { response } = require("express")

const paystack = (request) => {
    const MySecretkey = process.env.PAYSTACK_SECRET_KEY

    const initializePayment = (form, callback) => {
        const options = {
            url: "https://api.paystack.co/transaction/initialize",
            headers: {
                authorization: MySecretkey,
                'content_type' : "application/json",
                'cache-control': 'no-cache',
            },
            form  
        }
        const callback = (error, response, body) => {
            return mycallbck(error, body)
        }
        request.post(options, callback)
    }
    
    const verifypayment = (form, callback) => {
        const options = {
          url: "https://api.paystack.co/transaction/verify/{reference}",
          headers: {
            authorization: MySecretkey,
            content_type: "application/json",
            "cache-control": "no-cache",
          }
        };
        const callback = (error, response, body) => {
            return mycallbck(error, body)
        }
        request(options, callback)
    }
    return {initializePayment, verifypayment}
}

module.exports = paystack