const Flight = require("../model/flight");
const Price = require("../model/price")
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


function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
}

const createFlight = asyncHandler(async(req, res) => {
  const { flightNumber } = req.body;
  const flightAlreadyExists = await Flight.findOne({ where: { flightNumber } });
  if (!flightAlreadyExists) {
    const flight = await Flight.create(req.body);
    res.status(StatusCodes.CREATED).json(flight);
  } else {
    return res.status(StatusCodes.CONFLICT).json("Flight already exists");
  }
})

const updateFlight = asyncHandler(async(req, res) => {
  const flightId = req.params.id
  const { availableSeats, remarks, aircraft } = req.body;

  const existingFlight = await Flight.findByPk(flightId)
  if(!existingFlight) {
    return res.status(404).json({ error: "Flight not found"})
  }

  await existingFlight.update(
    {
      availableSeats,
      remarks,
      aircraft,
    },
    {
      returning: true,
    }
  );
  res.status(StatusCodes.OK).json({
    message: "Flight updated successfully",
    existingFlight: existingFlight,
  });

})

const deleteFlight = asyncHandler(async(req, res) => {
  const {id:flightId} = req.params;
  const flight = await Flight.findByPk(flightId);
  if (!flight) {
    throw new NotFoundError("Flight not found");
  }

  await Price.destroy({ where: { flightId } });
  await flight.destroy();
  res.status(StatusCodes.OK).json({ message: "Flight deleted successfully" });

})

const checkFlightStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const flight = await Flight.findByPk(id);

    if (!flight) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Flight not found" });
    }
    // Extract relevant information from the flight
    const {
      flightNumber,
      departureDateTime,
      arrivalDateTime,
      status,
      remarks,
    } = flight;

    res.status(StatusCodes.OK).json({
      flightNumber,
      departureDateTime: formatDate(departureDateTime),
      arrivalDateTime: formatDate(arrivalDateTime),
      status,
      remarks,
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
});


const updateFlightStatus = asyncHandler(async(req, res) => {
  const {status} = req.body
  const flight = await Flight.findByPk(req.params.id);
  if (!["Scheduled", "On Time", "Delayed", "Cancelled"].includes(status)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid flight status" });
  }
  flight.status = status;
  await flight.save();
  res.status(StatusCodes.OK).json(flight);
})

const getAllFlights = asyncHandler(async(req, res)=> {
  const flight = await Flight.findAll({
    order: [["arrivalDateTime", "ASC"]], // Order by arrivalDateTime in ascending order
  });
  if(!flight) {
    throw new NotFoundError("Flight not found")
  }
  res.status(StatusCodes.OK).json({flight})

})

const getAParticularFlight = asyncHandler(async(req, res) => {
  const flightId = req.params.id
  const flight = await Flight.findByPk(flightId)
  if(!flight) {
    throw new NotFoundError("Flight not found")
  }

  res.status(StatusCodes.OK).json(flight)


})

//TODO = search based on airrval and departure airport and departure date
const searchFlight = asyncHandler(async(req, res) => {
    
})

module.exports = {
    createFlight,
    updateFlight,
    deleteFlight,
    checkFlightStatus,
    getAllFlights,
    updateFlightStatus,
    getAParticularFlight
}