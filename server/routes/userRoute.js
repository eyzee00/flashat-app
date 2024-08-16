const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUser, getAllUsers } = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", getUser);
router.get("/", getAllUsers);


module.exports = router;