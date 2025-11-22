const express = require("express");
const agentRouter = new express.Router();
const agentValidator = require("../utilities/agentValidator");
const agentController = require("../controllers/agentController");

// Route to GET all agents
agentRouter.get(
    "/all",
    agentController.getAllAgents
);

// Route to GET one agent by an agent id
agentRouter.get(
    "/:agent_id",
    agentValidator.agentIdRules(),
    agentValidator.checkDataValidation,
    agentController.getAgentById
);

// Route to POST the creation of a new agent
agentRouter.post(
    "/new",
    agentValidator.agentCreationRules(),
    agentValidator.checkDataValidation,
    agentController.createAgent
);

// Route to PUT an update to an agent by an agent id
agentRouter.put(
    "/:agent_id",
    agentValidator.agentIdRules(),
    agentValidator.agentUpdateRules(),
    agentValidator.checkDataValidation,
    agentController.updateAgent
);

// Route to DELETE an agent by an agent id
agentRouter.delete(
    "/:agent_id",
    agentValidator.agentIdRules(),
    agentValidator.checkDataValidation,
    agentController.deleteAgent
);

// Route to add a house to an agent by agent and house ids
// /:agent_id/add/:house_id

// Route to remove a house from an agent by agent and house ids
// /:agent_id/remove/:house_id

module.exports = agentRouter;