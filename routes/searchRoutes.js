const express = require("express");
const router = express.Router();

const {
  searchFlight, searchArrivingAirportOnFlight, searchDepartureDateOnFlight
} = require("../controllers/flightCtrl");
const {
  getAllAirport
} = require("../controllers/airportCtrl")

router.get("/results", searchFlight)
router.get("/arriving-airport/:id", searchArrivingAirportOnFlight)
router.get("/date", searchDepartureDateOnFlight)
router.get("/get-all-airport", getAllAirport);

module.exports = router