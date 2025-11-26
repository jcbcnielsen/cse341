const express = require("express");
const { requiresAuth } = require("express-openid-connect");
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
    requiresAuth(),
    agentValidator.agentCreationRules(),
    agentValidator.checkDataValidation,
    agentController.createAgent
);

// Route to PUT an update to an agent by an agent id
agentRouter.put(
    "/:agent_id",
    requiresAuth(),
    agentValidator.agentIdRules(),
    agentValidator.agentUpdateRules(),
    agentValidator.checkDataValidation,
    agentController.updateAgent
);

// Route to DELETE an agent by an agent id
agentRouter.delete(
    "/:agent_id",
    requiresAuth(),
    agentValidator.agentIdRules(),
    agentValidator.checkDataValidation,
    agentController.deleteAgent
);

module.exports = agentRouter;