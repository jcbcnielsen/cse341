const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;

const client = new MongoClient(connectionString);

module.exports = { client, ObjectId };