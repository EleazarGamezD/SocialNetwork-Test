// ./routes/seed.js
const express = require("express");
const router = express.Router();
const seedController = require("../controllers/seedController");

router.get("/", seedController.seed);
module.exports = router;
