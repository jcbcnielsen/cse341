const { client, ObjectId } = require("../database/");
const database = client.db("cse341-class-project-1");
const contactsColl = database.collection("contacts");
const model = {};

model.getContactDataById = async function(contact_id) {
    // convert the contact_id string into an ObjectId
    const oid = new ObjectId(contact_id);

    // find and return the contact document
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

model.createNewContact = async function (doc) {
    // insert the document into the collection
    const result = await contactsColl.insertOne(doc);

    // check if the insertion was aknowledged, and return the error or generated id
    if (result.insertedId) {
        return `The contact was added with the _id of ${result.insertedId}`;
    } else {
        return `An error occurred with adding the contact to the database.`;
    }
}

model.updateContact = async function (contact_id, doc) {
    // create the objects needed for database interaction
    const oid = new ObjectId(contact_id);
    const updateDoc = { $set: doc };

    // update the contact document in the collection
    const result = await contactsColl.updateOne({ _id: oid }, updateDoc);

    // check if the update was aknowledged, and return the error or result
    if (result.matchedCount) {
        return `${result.modifiedCount} field(s) were updated in ${result.matchedCount} contact.`;
    } else {
        return `An error occured with updating the contact.`;
    }
}

model.deleteContact = async function (contact_id) {
    // convert the contact_id string into an ObjectId
    const oid = new ObjectId(contact_id);

    // delete the contact document in the collection
    const result = await contactsColl.deleteOne({ _id: oid });

    // check if the deletion was aknowledged, and return the error or result
    if (result.deletedCount) {
        return `The contact with the _id of ${contact_id} was deleted.`;
    } else {
        return `There was an error with deleting the contact.`
    }
}

module.exports = model;