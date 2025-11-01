const contactModel = require("../models/contactModel");
const controller = {};

controller.sendContactIdJson = async function(req, res) {
    const data = await contactModel.getContactDataById(req.params.contact_id);
    res.json(data);
}

controller.sendAllContactsJson = async function(req, res) {
    const data = await contactModel.getAllContactData();
    res.json(data);
}

module.exports = controller;