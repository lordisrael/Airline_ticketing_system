const express = require("express");
const router = express.Router();

const { createAirport, updateAirport, deleteAirport, getAirport} = require("../controllers/airportCtrl");
const {createFlight, checkFlightStatus, updateFlightStatus, getAllFlights, deleteFlight, updateFlight, getAParticularFlight} = require("../controllers/flightCtrl")
const {setPrice, getPrice, updatePrice} = require("../controllers/priceCtrl")
const { getPassengersOnParticularFlight } = require("../controllers/analyticsCtrl")

router.get("/get-flight/:id", getAParticularFlight)
router.post("/create-airport", createAirport);
router.patch("/update-airport/:id", updateAirport);
router.get("/get-airport/:id", getAirport)
router.delete("/delete-airport/:id", deleteAirport)
router.delete("/delete-flight/:id", deleteFlight)
router.post("/create-flight", createFlight)
router.get("/check-status/:id", checkFlightStatus)
router.post("/update-status/:id", updateFlightStatus)
router.get("/get-all-flight", getAllFlights)
router.post("/set-price/:id", setPrice)
router.get("/get-price/:id", getPrice)
router.patch("/update-price/:id", updatePrice)
router.patch("/update-flight/:id", updateFlight)
router.get("/analytics/passengers-onFlight/:id", getPassengersOnParticularFlight )

module.exports = router;
