const profModel = require("../models/profModel");
const controller = {};

controller.sendProfJson = async function(req, res) {
    const data = profModel.getProfData();
    res.json(data);
}

module.exports = controller;