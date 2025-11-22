const { body, param, validationResult } = require("express-validator");
const houseValidator = {};

houseValidator.houseIdRules = function() {
    return [
        param("house_id")
            .trim()
            .escape()
            .notEmpty()
            .isMongoId()
            .withMessage("An id is required and must be a valid MongoDB ObjectId.")
    ];
}

houseValidator.houseCreationRules = function() {
    return [
        body("address")
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("An address is required."),
        body("area")
            .isInt()
            .withMessage("Square footage is required, and must be an integer."),
        body("floors")
            .isInt()
            .withMessage("A floor count is required."),
        body("basement")
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .custom((basement) => {
                return basement == "Finished" || basement == "Unfinished" || basement == "None"
            })
            .withMessage("Basement info is required, and must be either 'Finished' 'Unfinished' or 'None'"),
        body("bedrooms")
            .isInt()
            .withMessage("A bedroom count is required."),
        body("bathrooms")
            .isInt()
            .withMessage("A bathroom count is required."),
        body("price")
            .isInt()
            .withMessage("A price is required."),
        body("status")
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .custom((status) => {
                return status == "Pending" || status == "For Sale" || status == "Under Contract" || status == "Sold"
            })
            .withMessage("Status info is required, and must be either 'Pending' 'For Sale' 'Under Contract' or 'Sold'")
    ];
}

houseValidator.houseUpdateRules = function() {
    return [
        body("address")
            .optional({ values: "null" })
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("Addresses must be strings."),
        body("area")
            .optional({ values: "null" })
            .isInt()
            .withMessage("Square footages must be an integers."),
        body("floors")
            .optional({ values: "null" })
            .isInt()
            .withMessage("Floor counts must be integers."),
        body("basement")
            .optional({ values: "null" })
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .custom((basement) => {
                return basement == "Finished" || basement == "Unfinished" || basement == "None"
            })
            .withMessage("Basement info must be a string, and must be either 'Finished' 'Unfinished' or 'None'"),
        body("bedrooms")
            .optional({ values: "null" })
            .isInt()
            .withMessage("Bedroom counts must be integers."),
        body("bathrooms")
            .optional({ values: "null" })
            .isInt()
            .withMessage("Bathroom counts must be integers."),
        body("price")
            .optional({ values: "null" })
            .isInt()
            .withMessage("Prices must be integers."),
        body("status")
            .optional({ values: "null" })
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .custom((status) => {
                return status == "Pending" || status == "For Sale" || status == "Under Contract" || status == "Sold"
            })
            .withMessage("Status info must be a string, and must be either 'Pending' 'For Sale' 'Under Contract' or 'Sold'")
    ];
}

houseValidator.checkDataValidation = function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors);
    }
    next();
}

module.exports = houseValidator;