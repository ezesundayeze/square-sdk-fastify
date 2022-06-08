const dotenv = require('dotenv');
dotenv.config();
const { Client, Environment } = require("square");

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

module.exports = client;


