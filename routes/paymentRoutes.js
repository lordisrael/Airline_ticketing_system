const express = require("express");

const {startPayment, createPayment, getPayment} = require('../controllers/paymentCtrl')

const router = express.Router();

router.post("/", startPayment);
router.get("/create-payment", createPayment);
router.get("/payment-details", getPayment);

module.exports = router;