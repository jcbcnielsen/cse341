const contactModel = require("../models/contactModel");
const controller = {};

controller.sendContactIdJson = async function(req, res) {
    // send the contact id to the model for database interaction
    const data = await contactModel.getContactDataById(req.params.contact_id);

    // send the data from the model back to user
    res.json(data);
}

controller.sendAllContactsJson = async function(req, res) {
    // get all the contact data from the model
    const data = await contactModel.getAllContactData();

    // send the data from the model back to user
    res.json(data);
}

controller.createNewContact = async function(req, res) {
    // create the contact object from the request body
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    // send the contact to the model for database interaction
    const dbRes = await contactModel.createNewContact(contact);

    // send model response back to user
    res.send(dbRes);
}

controller.updateContact = async function(req, res) {
    // create the contact object from the request body
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    // delete empty or null fields
    for (const prop in contact) {
        if (contact[prop] == "" || contact[prop] == null)
            delete contact[prop];
    }

    // send the contact info to the model for database interaction
    let dbRes;
    if (Object.values(contact).length != 0) {
        dbRes = await contactModel.updateContact(req.params.contact_id, contact);
    } else {
        return res.send("There was nothing to update for the contact.")
    }
    
    // send model response back to user
    res.send(dbRes);
}

controller.deleteContact = async function (req, res) {
    // send the contact id to the model for database interaction
    const dbRes = await contactModel.deleteContact(req.params.contact_id);

    // send model response back to user
    res.send(dbRes);
}

module.exports = controller;