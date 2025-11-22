const { body, param, validationResult } = require("express-validator");
const agentValidator = {};

agentValidator.agentIdRules = function() {
    return [
        param("agent_id")
            .trim()
            .escape()
            .notEmpty()
            .isMongoId()
            .withMessage("An id is required and must be a valid MongoDB ObjectId.")
    ];
}

agentValidator.agentCreationRules = function() {
    return [
        body("name")
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("A name is required."),
        body("email")
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .normalizeEmail()
            .withMessage("A valid email is required."),
        body("phone")
            .isMobilePhone()
    ];
}

agentValidator.agentUpdateRules = function() {
    return [
        body("name")
            .optional({ values: "null" })
            .trim()
            .escape()
            .isString()
            .withMessage("Names must be Strings."),
        body("email")
            .optional({ values: "null" })
            .trim()
            .escape()
            .if(body("email").notEmpty())
            .isEmail()
            .normalizeEmail()
            .withMessage("Emails must be valid."),
        body("phone")
            .optional({ values: "null" })
            .isMobilePhone()
    ];
}

agentValidator.checkDataValidation = function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors);
    }
    next();
}

module.exports = agentValidator;