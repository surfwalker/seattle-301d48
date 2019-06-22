// this code adds data to database and checks for stale data

function getForecasts(query, client, superagent) {
    // call a getStoredWeather and find out if there is data stored
    return getStoredWeather(query, client).then(weatherData => {
      console.log("the data from weather table ", weatherData);
  
      if (weatherData) {
        console.log("................got weathers from cached data");
        return weatherData;
      } else {
        console.log("................got weathers from api");
        return getWeatherFromAPI(query, client, superagent);
      }
    });
  }
  
  function getStoredWeather(query, client) {
    const SQL = `SELECT * FROM weathers WHERE location_id=${query.id}`;
  
    return client.query(SQL).then(results => {
        
      let valid = cacheValidation( results.rows[0].created_at, 43200000);
      if (valid) {
        return results.rows[0];
      } else {
        // get rid of the weather data from selected rows
        let deleteSQL = `DELETE FROM weathers WHERE location_id=${query.id}`;
        client.query(deleteSQL);
        return undefined;
      }
    });

  }
  
  function getWeatherFromAPI(query, client, superagent) {
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
    // the time this function was called
    let createdAt = new Date().valueOf();
  
    const insertSQL = `INSERT INTO weathers (forecast, time, created_at, location_id) VALUES 
      ('${weather.forecast}', '${weather.time}', ${createdAt}, ${locationId});`;
    return client.query(insertSQL).then(results => {
      return results;
    });
  }

  // return true if the cache is valid
  // add another parameter to store the keepAlive time to make this function reusable for other data
  function cacheValidation(createdAt, keepAlive) {
    let now = new Date().valueOf(); // this is in Epoch time (milliseconds since 1970)
    if (Math.abs(now - createdAt) > keepAlive) {
      return false;
    }
    return true;
  }

  
  function Weather(dayData) {
    this.forecast = dayData.summary;
    this.time = new Date(dayData.time * 1000).toString().slice(0, 15);
  }
  
  module.exports = getForecasts;
  