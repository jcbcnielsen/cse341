const { client, ObjectId } = require("../database/");
const database = client.db("cse341-class-project-2");
const houseColl = database.collection("houses");
const houseModel = {};

houseModel.getAllHouses = async function() {
    // Get an array of all the houses in the collection
    const houseArray = houseColl.find();

    // Initialize an object to store the data
    let allHouses = {
        houses: []
    };

    // Loop through the array, adding each document to the object
    let index = 0;
    for await (const doc of houseArray) {
        allHouses.houses[index] = doc;
        index++;
    }

    // Return the houses array as an object
    return allHouses;
}

houseModel.getHouseById = async function(house_id) {
    // Convert the house_id string into an ObjectId
    const hid = new ObjectId(house_id);

    // Find and return the house document
    const house = await houseColl.findOne({ _id: hid });
    return house;
}

houseModel.createHouse = async function(house) {
    // Insert the document into the database
    const result = await houseColl.insertOne(house);

    // Return status
    if (result.acknowledged)
        return [200, "House Data Created"];
    else
        return [500, "Database Error"];
}

houseModel.updateHouse = async function(house_id, house) {
    // Create the objects needed for database interaction
    const hid = new ObjectId(house_id);
    const updateDocument = { $set: house };

    // Update the document in the collection
    const result = await houseColl.updateOne({ _id: hid }, updateDocument);

    // Return status
    if (result.acknowledged)
        return [200, "House Data Updated"];
    else
        return [500, "Database Error"];
}

houseModel.deleteHouse = async function(house_id) {
    // Convert the house_id string into an ObjectId
    const hid = new ObjectId(house_id);

    // Delete the document from the collection
    const result = await houseColl.deleteOne({ _id: hid });

    // Return status
    if (result.acknowledged)
        return [200, "House Data Deleted"];
    else
        return [500, "Database Error"];
}

module.exports = houseModel;