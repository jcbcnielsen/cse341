const express = require("express");
const router = new express.Router();
const contactValidator = require("../validation/contactValidator");
const contactController = require("../controllers/contactController");

// Route to GET data for all contacts
router.get(
    "/all",
    contactController.sendAllContactsJson
);

// Route to POST data for a new contact
router.post(
    "/new",
    contactValidator.contactCreationRules(),
    contactValidator.checkDataValidation,
    contactController.createNewContact
);

// Route to GET data for one specified contact
router.get(
    "/:contact_id",
    contactValidator.contactIdRules(),
    contactValidator.checkDataValidation,
    contactController.sendContactIdJson
);

// Route to PUT an update for a specified contact
router.put(
    "/:contact_id",
    contactValidator.contactIdRules(),
    contactValidator.contactUpdateRules(),
    contactValidator.checkDataValidation,
    contactController.updateContact
);

// Route to DELETE a specified contact
router.delete(
    "/:contact_id",
    contactValidator.contactIdRules(),
    contactValidator.checkDataValidation,
    contactController.deleteContact
);

module.exports = router;