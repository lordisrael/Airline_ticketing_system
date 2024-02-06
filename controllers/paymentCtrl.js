const PaymentService = require("../services/payment.service");
const paymentInstance = new PaymentService();

const startPayment = async(req, res) => {
    try {
      const response = await paymentInstance.startPayment(req.body);
      res.status(201).json({ status: "Success", data: response });
    } catch (error) {
      res.status(500).json({ status: "Failed", message: error.message });
    }
}
// const startPayment = async (req, res) => {
//   try {
//     const response = await paymentInstance.startPayment(req.body);
//     res.status(201).json({ status: "Success", data: response });
//   } catch (error) {
//     const errorMessage = error?.message || "An unexpected error occurred";
//     res.status(500).json({ status: "Failed", message: errorMessage });
//   }
// };


const createPayment = async(req, res) => {
    try {
      const response = await paymentInstance.createPayment(req.query);
      res.status(201).json({ status: "Success", data: response });
    } catch (error) {
      res.status(500).json({ status: "Failed", message: error.message });
    }
}

const getPayment = async(req, res) => {
    try {
      const response = await paymentInstance.paymentReciept(req.body);
      res.status(201).json({ status: "Success", data: response });
    } catch (error) {
      res.status(500).json({ status: "Failed", message: error.message });
    }
}

module.exports = {
    startPayment,
    createPayment,
    getPayment
}