const { client, ObjectId } = require("../database/");
const database = client.db("cse341-class-project-2");
const agentColl = database.collection("agents");
const agentModel = {};

agentModel.getAllAgents = async function() {
    // Get an array of all the agents in the collection
    const agentArray = agentColl.find();

    // Initialize an object to store the data
    let allAgents = {
        agents: []
    };

    // Loop through the array, adding each document to the object
    let index = 0;
    for await (const doc of agentArray) {
        allAgents.agents[index] = doc;
        index++;
    }

    // Return the agents array as an object
    return allAgents;
}

agentModel.getAgentById = async function(agent_id) {
    // Convert the agent_id string to an ObjectId
    const aid = new ObjectId(agent_id);

    // Find and return the agent document
    const agent = await agentColl.findOne({ _id: aid });
    return agent;
}

agentModel.createAgent = async function(agent) {
    // Insert the document into the database
    const result = await agentColl.insertOne(agent);

    // Return status
    if (result.acknowledged)
        return [200, "Agent Data Created"];
    else
        return [500, "Database Error"];
}

agentModel.updateAgent = async function(agent_id, agent) {
    // Create the objects needed for database interaction
    const aid = new ObjectId(agent_id);
    const updateDocument = { $set: agent };

    // Update the document in the collection
    const result = await agentColl.updateOne({ _id: aid }, updateDocument);

    // Return status
    if (result.acknowledged)
        return [200, "Agent Data Updated"];
    else
        return [500, "Database Error"];
}

agentModel.deleteAgent = async function(agent_id) {
    // Convert the agent_id string to an ObjectId
    const aid = new ObjectId(agent_id);

    // Delete the document in the collection
    const result = await agentColl.deleteOne({ _id: aid });

    // Return status
    if (result.acknowledged)
        return [200, "Agent Data Deleted"];
    else
        return [500, "Database Error"];
}

module.exports = agentModel;