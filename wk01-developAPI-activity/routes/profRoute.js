const express = require("express");
const router = new express.Router();
const profController = require("../controllers/profController");

// Route to GET data for frontend
router.get("/", profController.sendProfJson);

module.exports = router;