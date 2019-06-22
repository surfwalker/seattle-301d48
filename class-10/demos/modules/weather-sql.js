// This code adds data to the database and DOES NOT check for stale data

function getForecasts(query, client, superagent) {
    
  return checkStoredWeather(query, client).then(weathers => {
    
    //if weathers is found, return the weathers
    if (weathers.length > 0) {
      console.log("from cache ", weathers);
      return weathers;
    }

    //if weathers is not found, get Location from API
    else {
      return getWeatherFromAPI(query, client, superagent);
    }
  });
}

function checkStoredWeather(query, client) {

  const SQL = `SELECT * FROM weathers WHERE location_id=${id}`;
  return client.query(SQL).then(results => {
    return results.rows;
  });
}

function getWeatherFromAPI(query, client, superagent) {
  console.log("query from weather api function ", query);
  const URL = `https://api.darksky.net/forecast/${
    process.env.WEATHER_API_KEY
  }/${query.latitude},${query.longitude}`;
  return superagent
    .get(URL)
    .then(response => response.body.daily.data)
    .then(days => {
      return days.map(day => {
        let weather = new Weather(day);
        cacheWeather(weather, client, query.id);
        return weather;
      });
    });
}

function cacheWeather(weather, client, locationId) {
  console.log("caching weather data ", weather, locationId);
  const SQL = `INSERT INTO weathers (forecast, time, location_id) VALUES ('${
    weather.forecast
  }', '${weather.time}', ${locationId});`;
  return client.query(SQL).then(results => weather);
}

function Weather(dayData) {
  this.forecast = dayData.summary;
  this.time = new Date(dayData.time * 1000).toString().slice(0, 15);
}

module.exports = getForecasts;
