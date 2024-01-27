const express = require("express");
const router = express.Router();

const { createAirport, updateAirport, deleteAirport } = require("../controllers/airportCtrl");

router.post("/create-airport", createAirport);
router.put("/update-airport", updateAirport);
router.delete("/delete-airport", deleteAirport)

module.exports = router;
