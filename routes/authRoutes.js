const express = require("express");
const router = express.Router();

const {
    createUser
} = require("../controllers/authCtrl");

router.post("/register", createUser);


module.exports = router;