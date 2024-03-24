const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
    createUser, login, profile, logout, updatePassword
} = require("../controllers/authCtrl");

router.post("/register", createUser);
router.post("/login", login)
router.get("/logout", logout)
router.post("/update-password",authMiddleware, updatePassword)
router.get("/profile", authMiddleware, profile);

module.exports = router;

