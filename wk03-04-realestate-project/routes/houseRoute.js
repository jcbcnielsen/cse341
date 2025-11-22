const express = require("express");
const houseRouter = new express.Router();
const houseValidator = require("../utilities/houseValidator");
const houseController = require("../controllers/houseController");

// Route to GET all houses
houseRouter.get(
    "/all",
    houseController.getAllHouses
);

// Route to GET a house by id
houseRouter.get(
    "/:house_id",
    houseValidator.houseIdRules(),
    houseValidator.checkDataValidation,
    houseController.getHouseById
);

// Route to POST the creation of a new house
houseRouter.post(
    "/new",
    houseValidator.houseCreationRules(),
    houseValidator.checkDataValidation,
    houseController.createHouse
);

// Route to PUT an update to a house by id
houseRouter.put(
    "/:house_id",
    houseValidator.houseIdRules(),
    houseValidator.houseUpdateRules(),
    houseValidator.checkDataValidation,
    houseController.updateHouse
);

// Route to DELETE a house by id
houseRouter.delete(
    "/:house_id",
    houseValidator.houseIdRules(),
    houseValidator.checkDataValidation,
    houseController.deleteHouse
);

module.exports = houseRouter;