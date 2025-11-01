const express = require("express");
const router = express.Router();

// Static route, set up frontend folder
router.use(express.static("frontend"));

module.exports = router;