const { body, param, validationResult } = require("express-validator");
const validator = {};

validator.contactIdRules = function() {
    return [
        param("contact_id")
            .trim()
            .escape()
            .notEmpty()
            .isMongoId()
            .withMessage("An id is required and must be a valid MongoDB ObjectId.")
    ];
}

validator.contactCreationRules = function() {
    return [
        body("firstName")
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("A first name is required."),
        body("lastName")
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("A last name is required."),
        body("email")
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .normalizeEmail()
            .withMessage("A valid email is required."),
        body("favoriteColor")
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("A favorite color is required."),
        body("birthday")
            .trim()
            .escape()
            .notEmpty()
            .isDate({ format: "yyyy-mm-dd" })
            .withMessage("A birthday in yyyy-mm-dd format is required.")
    ];
}

validator.contactUpdateRules = function() {
    return [
        body("firstName")
            .optional({ values: "null" })
            .trim()
            .escape()
            .isString()
            .withMessage("First names must be Strings."),
        body("lastName")
            .optional({ values: "null" })
            .trim()
            .escape()
            .isString()
            .withMessage("Last names must be Strings."),
        body("email")
            .optional({ values: "null" })
            .trim()
            .escape()
            .if(body("email").notEmpty())
            .isEmail()
            .normalizeEmail()
            .withMessage("Emails must be valid."),
        body("favoriteColor")
            .optional({ values: "null" })
            .trim()
            .escape()
            .isString()
            .withMessage("Favorite colors must be Strings."),
        body("birthday")
            .optional({ values: "null" })
            .trim()
            .escape()
            .if(body("birthday").notEmpty())
            .isDate({ format: "yyyy-mm-dd" })
            .withMessage("Birthdays must be Strings in yyyy-mm-dd format.")
    ];
}

validator.checkDataValidation = function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send(errors);
    }
    next();
}

module.exports = validator;