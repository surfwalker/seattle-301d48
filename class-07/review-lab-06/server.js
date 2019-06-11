'use strict';

// Wire up environment variables
require('dotenv').config();

// Application dependencies`
const express = require('express');
const cors = require('cors');

// Application set up
const PORT = process.env.PORT;
const app = express();
app.use(cors());

app.get('/location', handleLocationRequest);
app.get('/weather', handleWeatherRequest);

app.listen(PORT, () => console.log('Listening on PORT', PORT));

function handleLocationRequest(request, response) {
  try {
    const locationRawData = require('./data/geo.json');

    const location = new Location(request.query.data, locationRawData);

    response.send(location);
  } catch (error) {
    handleError(error, response);
  }
}

function Location(query, rawData) {
  this.search_query = query;
  this.formatted_query = rawData.results[0].formatted_address;
  this.latitude = rawData.results[0].geometry.location.lat;
  this.longitude = rawData.results[0].geometry.location.lng;
}

function handleWeatherRequest(request, response) {
  try {
    const rawData = require('./data/darksky.json');
    const daySummaries = [];
    rawData.daily.data.forEach(dayData => {
      daySummaries.push(new Weather(dayData));
    });

    response.send(daySummaries);

  } catch (error) {
    handleError(error, response);
  }
}

function Weather(dayData) {
  this.forecast = dayData.summary;
  // time returned is "epoch seconds" and we want "epoch milliseconds"
  // so multiply by 1000
  // the "epoch" began midnight January 1, 1970                     
  this.time = new Date(dayData.time * 1000).toString().slice(0,15);
}
       
function handleError(error, response) {
  console.error(error);
  response.status(500).send('Ruh roh');
}






