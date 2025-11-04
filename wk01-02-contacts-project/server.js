// This file is the main project file

// Require statements
const express = require("express");
const env = require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const contactRoute = require("./routes/contactRoute");
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("./api-docs/swagger.json");

// ------------------------------------------------
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ------------------------------------------------
// Routes
// Contacts API route
app.use("/contacts", contactRoute);

// Documentation route
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// ------------------------------------------------
// Local server info
const port = process.env.PORT;
const host = process.env.HOST;

// ------------------------------------------------
// Log statement to confirm server operation
app.listen(port, function() {
    console.log(`App listening on ${host}:${port}`);
});