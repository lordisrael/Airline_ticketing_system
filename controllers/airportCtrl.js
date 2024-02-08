const Airport = require('../model/airport')
const uuidValidate = require('uuid-validate')
const asyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes");

const createAirport = async(req, res) => {
      const { iata_code } = req.body;
      const airportAlreadyExists = await Airport.findOne({ where: { iata_code } });
      if (!airportAlreadyExists) {
        const airport = await Airport.create(req.body);
        res.status(StatusCodes.CREATED).json({status:"Success", data:airport});
      } else {
        return res.status(StatusCodes.CONFLICT).json("Airport already exists");
      }
}

const updateAirport = async(req, res) => {
   const airportId = req.params.id;
   const { iata_code, name, city, country, latitude, longitude } = req.body;

   // Find the airport by ID
   let airport = await Airport.findByPk(airportId);

   // Check if the airport exists
   if (!airport) {
     return res
       .status(StatusCodes.NOT_FOUND)
       .json({ error: "Airport not found" });
   }

   // Update the airport fields if they exist in the request body
   if (iata_code) {
     airport.iata_code = iata_code;
   }
   if (name) {
     airport.name = name;
   }
   if (city) {
     airport.city = city;
   }
   if (country) {
     airport.country = country;
   }
   if (latitude) {
     airport.latitude = latitude;
   }
   if (longitude) {
     airport.longitude = longitude;
   }

   // Save the updated airport
   await airport.save();

   res.status(StatusCodes.OK).json({ status: "Success", data:airport });
}

const getAirport = asyncHandler(async(req, res) => {
   const airportId = req.params.id;

   // Find airport by ID
   const airport = await Airport.findByPk(airportId);
   if (!airport) {
     return res
       .status(StatusCodes.NOT_FOUND)
       .json({ error: "Airport not found" });
   }
   res.status(StatusCodes.OK).json({ status: "Success", data: airport });

})

const getAllAirport = asyncHandler(async(req, res) => {
  // Retrieve all airports
  const airports = await Airport.findAll();

  if (!airports || airports.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "No airports found" });
  }

  res.status(StatusCodes.OK).json({ status: "Success", data: airports });
})


const deleteAirport = asyncHandler(async(req, res) => {
  const airportId = req.params.id;

  // Find the airport by ID
  const airport = await Airport.findByPk(airportId);

  // Check if the airport exists
  if (!airport) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Airport not found" });
  }

  // Delete the airport
  await airport.destroy();

  res.status(StatusCodes.OK).json({ status: "Success",message: "Airport deleted successfully" });
})

module.exports = {
    createAirport,
    updateAirport,
    deleteAirport,
    getAirport,
    getAllAirport

}