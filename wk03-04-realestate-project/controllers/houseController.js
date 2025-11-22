const houseModel = require("../models/houseModel");
const houseController = {};

houseController.getAllHouses = async function(req, res) {
    // Get all house data from the model
    const houses = await houseModel.getAllHouses();

    // Send data to the user as JSON
    res.json(houses);
}

houseController.getHouseById = async function(req, res) {
    // Get house data from the model
    const house = await houseModel.getHouseById(req.params.house_id);

    // Send the data to the user as JSON
    res.json(house);
}

houseController.createHouse = async function(req, res) {
    // Create the house document from the request body
    const house = {
        address: req.body.address,
        area: req.body.area,
        floors: req.body.floors,
        basement: req.body.basement,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        price: req.body.price,
        status: req.body.status
    };

    // Send the house to the model for database interaction
    const dbRes = await houseModel.createHouse(house);

    // Send the status of the operation back to the user
    res.status(dbRes[0]).send(dbRes[1]);
}

houseController.updateHouse = async function(req, res) {
    // Create the house document from the request body
    const house = {
        address: req.body.address,
        area: req.body.area,
        floors: req.body.floors,
        basement: req.body.basement,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        price: req.body.price,
        status: req.body.status
    };

    // Delete empty or null fields
    for (const property in house) {
        if (house[property] == "" || house[property] == null)
            delete house[property];
    }

    // Send the house document to the model for database interaction
    let dbRes;
    if (Object.values(house).length != 0) {
        dbRes = await houseModel.updateHouse(req.params.house_id, house);
    }

    // Send the status of the operation back to the user
    res.status(dbRes[0]).send(dbRes[1]);
}

houseController.deleteHouse = async function(req, res) {
    // Send the house_id to the model for database interaction
    const dbRes = await houseModel.deleteHouse(req.params.house_id);

    // Send the status of the operation back to the user
    res.status(dbRes[0]).send(dbRes[1]);
}

module.exports = houseController;