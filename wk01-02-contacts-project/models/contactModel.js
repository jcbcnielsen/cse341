const { client, ObjectId } = require("../database/");
const database = client.db("cse341-class-project-1");
const contactsColl = database.collection("contacts");
const model = {};

model.getContactDataById = async function(contact_id) {
    const oid = new ObjectId(contact_id);
    const contact = await contactsColl.findOne(oid);
    return contact;
}

model.getAllContactData = async function() {
    const contactArray = contactsColl.find();
    let allContacts = {
        contacts: []
    };
    let index = 0;
    for await (const doc of contactArray) {
        allContacts.contacts[index] = doc;
        index++;
    }
    return allContacts;
}

module.exports = model;