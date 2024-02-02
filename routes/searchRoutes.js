const express = require("express");
const router = express.Router();

const {
  searchFlight, searchArrivingAirportOnFlight, searchDepartureDateOnFlight
} = require("../controllers/flightCtrl");

router.get("/results", searchFlight)
router.get("/arriving-airport/:id", searchArrivingAirportOnFlight)
router.get("/date", searchDepartureDateOnFlight)

module.exports = router