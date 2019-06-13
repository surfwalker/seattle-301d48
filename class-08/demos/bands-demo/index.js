'use strict';

// Load Environment variables from .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');


// Application Setup
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// pg is the library that allows JS (when running on Node) to talk to Postgres database
const pg = require('pg');
const client = new pg.Client(DATABASE_URL);
client.connect();
client.on('err', err => console.error(err));


const app = express();

app.use(cors());

// Route
app.get('/bands', getBands);


// Start the server up on a given port
app.listen(PORT, () => console.log(`App is up on ${PORT}`) );

// Helper functions and handlers

function getBands(request, response) {
  client.query('SELECT * FROM bands;')
    .then(results => response.send(results.rows))
    .catch(error => console.error(error))
}



