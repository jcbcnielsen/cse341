// This file is the main project file

// Require statements
const express = require("express");
const env = require("dotenv").config();
const app = express();
const stat = require("./routes/static");
const frontController = require("./controllers/frontController");
const profRoute = require("./routes/profRoute");

// Set the view engine to express
app.set("view engine", "ejs");

// ------------------------------------------------
// Routes
app.use(stat);
// Index route
app.get("/", frontController.buildFrontend);
// Professional API route
app.use("/professional", profRoute);

// ------------------------------------------------
// Local server info
const port = process.env.PORT;
const host = process.env.HOST;

// ------------------------------------------------
// Log statement to confirm server operation
app.listen(port, function() {
    console.log(`App listening on ${host}:${port}`);
});