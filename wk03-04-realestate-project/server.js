// This file is the main project file

// Require statements
const express = require("express");
const env = require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const { auth } = require("express-openid-connect");
const agentRoute = require("./routes/agentRoute");
const houseRoute = require("./routes/houseRoute");
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("./api-docs/swagger.json");

// ------------------------------------------------
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH_CLIENT_SECRET,
    baseURL: process.env.URL,
    clientID: process.env.AUTH_CLIENT_ID,
    issuerBaseURL: process.env.AUTH_BASE_URL
};

// ------------------------------------------------
// Routes

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

// Agents API route
app.use("/agents", agentRoute);

// Houses API route
app.use("/houses", houseRoute);

// Documentation route
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.get("/callback", (req, res) => {
    res.redirect("/api-docs");
})

// ------------------------------------------------
// Local server info
const port = process.env.PORT;
const host = process.env.HOST;

// ------------------------------------------------
// Log statement to confirm server operation
app.listen(port, function() {
    console.log(`App listening on ${host}:${port}`);
});