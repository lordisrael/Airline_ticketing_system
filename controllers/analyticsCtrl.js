const asyncHandler = require('express-async-handler')
const Passenger = require("../model/passenger")
const Flight = require("../model/flight")
const Price = require("../model/price")


const getPassengersOnParticularFlight = asyncHandler(async(req, res) => {
    const flightId = req.params.id
    try {
      // Find the price records associated with the flightId
      const prices = await Price.findAll({
        where: { flightId },
        attributes: ["id"], // Retrieve only the price IDs
      });

      // Extract the price IDs from the result
      const priceIds = prices.map((price) => price.id);

      // Find passengers associated with the extracted price IDs
      const passengers = await Passenger.findAll({
        where: { priceId: priceIds },
        attributes: [
          "id",
          "firstname",
          "lastname",
          "email",
          "mobile",
          "dob",
          "gender",
          "title",
          "country",
          "reference",
          "status",
        ],
      });

      // Send the response with the passengers found
      res.status(200).json({ status: "Success", data: passengers });
    } catch (error) {
      // Handle errors
      res.status(500).json({ status: "Failed", message: error.message });
    }
})

module.exports = {
    getPassengersOnParticularFlight
}