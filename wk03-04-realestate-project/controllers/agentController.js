const agentModel = require("../models/agentModel");
const agentController = {};

agentController.getAllAgents = async function(req, res) {
    // Get all the agent data from the model
    const agents = await agentModel.getAllAgents();

    // Send the data to the user as JSON
    res.json(agents);
}

agentController.getAgentById = async function(req, res) {
    // Get the agent data from the model
    const agent = await agentModel.getAgentById(req.params.agent_id);

    // Send the data to the user as JSON
    res.json(agent);
}

agentController.createAgent = async function(req, res) {
    // Create the agent document from the request body
    const agent = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }

    // Send the agent to the model for database interaction
    const dbRes = await agentModel.createAgent(agent);

    // Send the status of the operation back to the user
    res.status(dbRes[0]).send(dbRes[1]);
}

agentController.updateAgent = async function(req, res) {
    // Create the agent document from the request body
    const agent = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }

    // Delete empty or null fields
    for (const property in agent) {
        if (agent[property] == "" || agent[property] == null) {
            delete agent[property];
        }
    }

    // Send the agent document to the model for database interaction
    let dbRes;
    if (Object.values(agent).length != 0) {
        dbRes = await agentModel.updateAgent(req.params.agent_id, agent);
    }

    // Send the status of the operation back to the user
    res.status(dbRes[0]).send(dbRes[1]);
}

agentController.deleteAgent = async function(req, res) {
    // Send the agent_id to the model for database interaction
    const dbRes = await agentModel.deleteAgent(req.params.agent_id);

    // Send the status of the operation back to the user
    res.status(dbRes[0]).send(dbRes[1]);
}

module.exports = agentController;