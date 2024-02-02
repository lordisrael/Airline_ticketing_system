const express = require("express");
const router = express.Router();

const { createAirport, updateAirport, deleteAirport } = require("../controllers/airportCtrl");
const {createFlight, checkFlightStatus, updateFlightStatus, getAllFlights, deleteFlight, updateFlight, getAParticularFlight} = require("../controllers/flightCtrl")
const {setPrice, getPrice, updatePrice} = require("../controllers/priceCtrl")

router.get("/get-flight/:id", getAParticularFlight)
router.post("/create-airport", createAirport);
router.put("/update-airport", updateAirport);
router.delete("/delete-airport", deleteAirport)
router.delete("/delete-flight/:id", deleteFlight)
router.post("/create-flight", createFlight)
router.get("/check-status/:id", checkFlightStatus)
router.post("/update-status/:id", updateFlightStatus)
router.get("/get-all-flight", getAllFlights)
router.post("/set-price/:id", setPrice)
router.get("/get-price/:id", getPrice)
router.patch("/update-price/:id", updatePrice)
router.patch("/update-flight/:id", updateFlight)

module.exports = router;
