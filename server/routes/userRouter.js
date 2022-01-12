const { application } = require("express");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
router.get("/", (req, res) => {
  res.send("response from user router");
});

router.get("/register", async (req, res) => {
  const { name, email, password } = req.body;
});

module.exports = router;
