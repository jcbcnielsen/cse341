// This file is the main project file

// Require statements
const express = require("express");
const env = require("dotenv").config();
const app = express();
const contactRoute = require("./routes/contactRoute");

// Set the view engine to express
app.set("view engine", "ejs");

// ------------------------------------------------
// Routes
// Contacts API route
app.use("/contacts", contactRoute);

// ------------------------------------------------
// Local server info
const port = process.env.PORT;
const host = process.env.HOST;

// ------------------------------------------------
// Log statement to confirm server operation
app.listen(port, function() {
    console.log(`App listening on ${host}:${port}`);
});