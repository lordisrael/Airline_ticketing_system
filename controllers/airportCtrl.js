const Airport = require('../model/airport')
const uuidValidate = require('uuid-validate')
const { StatusCodes } = require("http-status-codes");

const createAirport = async(req, res) => {
      const { iata_code } = req.body;
      const airportAlreadyExists = await Airport.findOne({ where: { iata_code } });
      if (!airportAlreadyExists) {
        const airport = await Airport.create(req.body);
        res.status(StatusCodes.CREATED).json(airport);
      } else {
        return res.status(StatusCodes.CONFLICT).json("Airport already exists");
      }
}

const updateAirport = async(req, res) => {

}

const deleteAirport = async(req, res) => {

}

module.exports = {
    createAirport,
    updateAirport,
    deleteAirport

}