
const Passenger = require("../model/passenger")
const _ = require('lodash')
const getPriceByCategory = require("../utils/pricing");

const { initializePayment, verifyPayment } = require("../utils/payments")
class PaymentService {
  startPayment(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const form = _.pick(data, ['priceCategory', "priceId", "email", "mobile", "dob", "gender","firstname", "title", "lastname", "country", "priceId"]);
        form.metadata = {
          firstname: form.firstname,
          lastname: form.lastname,
          gender: form.gender,
          mobile: form.mobile,
          dob: form.dob,
          title: form.title,
          priceId: form.priceId,
          country: form.country
        }
        const price = await getPriceByCategory(form.priceId, form.priceCategory);
          if (price === null) {
            throw { code: 400, msg: "Invalid priceCategory" };
          }

        form.amount = price * 100;
        initializePayment(form, (error, body) => {
          if (error) {
            reject(error.message);
          }
          const response = JSON.parse(body);

          return resolve(response);
        });
      } catch (error) {
        error.source = "Start Payement Service";
        return reject(error);
      }
    });
  }
  createPayment(req) {
    const ref = req.reference;
    if (ref == null) {
      return reject({ code: 400, msg: "No reference passed in query!" });
    }
    return new Promise(async (resolve, reject) => {
      try {
        verifyPayment(ref, (error, body) => {
          if (error) {
            reject(error.message);
          }
          const response = JSON.parse(body);
          console.log(response)

          const { reference, amount, status } = response.data;
          const { email } = response.data.customer;
          const firstname = response.data.metadata.firstname;
          const lastname = response.data.metadata.lastname;
          const gender = response.data.metadata.gender;
          const dob = response.data.metadata.dob;
          const mobile = response.data.metadata.mobile
          const title = response.data.metadata.title
          const country = response.data.metadata.country
          const priceId = response.data.metadata.priceId
          const newPayment = { reference, amount,gender, priceId, country, dob, mobile, email, firstname, lastname, status, title};
          const payment = Passenger.create(newPayment);

          return resolve(payment);
        });
      } catch (error) {
        error.source = "Create Payment Service";
        return reject(error);
      }
    });
  }

  paymentReciept(body) {
    return new Promise(async (resolve, reject) => {
      try {
        const reference = body.reference;
        const transaction = Passenger.findOne({ reference: reference });
        return resolve(transaction);
      } catch (error) {
        error.source = "Payment Reciept";
        return reject(error);
      }
    });
  }
}

module.exports = PaymentService;