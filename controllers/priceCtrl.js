const Price = require("../model/price");
const Flight = require("../model/flight")
const uuidValidate = require("uuid-validate");
const { createJWT } = require("../config/jwt");
const { createRefreshJWT } = require("../config/refreshjwt");
const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const { comparePasswords } = require("../config/comparePassword");
const {
  ConflictError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../error");



const setPrice = asyncHandler(async(req, res) => {
  const flightId = req.params.id;
  const { economy, business, firstClass } = req.body;

  // Check if the associated Flight exists
  const flight = await Flight.findByPk(flightId);
  if (!flight) {
    throw new NotFoundError("Flight not found");
  }

  // Check if a price already exists for the flight
  const existingPrice = await Price.findOne({ where: { flightId } });
  if (existingPrice) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ error: "Flight already has a price" });
  }

  // Check if availableSeats are specified for the classes
  const { availableSeats } = flight;
  const isValidClass = (className) =>
    availableSeats && availableSeats[className] !== undefined;

  // Create a new Price record only for the classes with available seats
  const newPriceAttributes = {
    flightId,
  };

  if (isValidClass("economy")) {
    newPriceAttributes.economy = economy;
  }

  if (isValidClass("business")) {
    newPriceAttributes.business = business;
  }

  if (isValidClass("firstClass")) {
    newPriceAttributes.firstClass = firstClass;
  }

  // Create a new Price record only if at least one class has available seats
  if (Object.keys(newPriceAttributes).length > 1) {
    const newPrice = await Price.create(newPriceAttributes);
    res.status(StatusCodes.CREATED).json({ status: "Success",data: newPrice });
  } else {
    // If no valid class is specified or all specified classes have no available seats
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "No valid class with available seats specified" });
  }
});



const getPrice = asyncHandler(async(req, res) => {
  const  flightId  = req.params.id;
  const prices = await Price.findAll({
    where: { flightId },
    attributes: { exclude: ["updatedAt", "createdAt", "flightId"] },
  });
   if (!prices || prices.length === 0) {
     throw new NotFoundError("Prices not found for the specified flightId");
   }
  res.status(StatusCodes.OK).json({ status: "Success", data: prices });
})

const updatePrice = asyncHandler(async(req, res) => {
  const priceId = req.params.id;
  const { economy, business, firstClass } = req.body;
  // Ensure that the Price record with the given ID exists
  const existingPrice = await Price.findByPk(priceId);

  if (!existingPrice) {
    return res.status(404).json({ error: "Price not found" });
  }
  // Update the Price record
  await existingPrice.update({
    economy,
    business,
    firstClass,
  });
  return res.status(200).json({ status: "Success", message: "Price updated successfully" });
})

module.exports = {
    setPrice,
    getPrice,
    updatePrice,
}