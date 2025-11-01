const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;

const client = new MongoClient(connectionString, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

module.exports = client;