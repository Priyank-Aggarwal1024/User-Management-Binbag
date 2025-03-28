const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/auth.controller");
const {
  validateRegister,
  validateLogin,
} = require("../validators/auth.validator");

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

module.exports = router;
