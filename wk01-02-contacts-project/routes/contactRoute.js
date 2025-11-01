const express = require("express");
const router = new express.Router();
const contactController = require("../controllers/contactController");

// Route to GET data for one specified contact
router.get("/lup/:contact_id", contactController.sendContactIdJson);

// Route to GET data for all contacts
router.get("/all", contactController.sendAllContactsJson);

// Route to POST data for a new contact
//router.post("/new");

// Route to PUT an update for a specified contact
//router.put("/upd/:contact_id");

// Route to DELETE a specified contact
//router.delete("/del/:contact_id");

module.exports = router;