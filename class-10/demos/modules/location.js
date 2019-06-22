function getLocation(query, client, superagent) {
    return getStoredLocation(query, client).then(location => {
      if (location) {
        return location;
      } else {
        return getLocationFromApi(query, client, superagent);
      }
    });
  }
  
  function getStoredLocation(query, client) {
    const sql = `SELECT * FROM locations WHERE search_query='${query}'`;
  
    return client.query(sql).then(results => results.rows[0]);
  }
  
  function getLocationFromApi(query, client, superagent) {
    const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${
      process.env.GEOCODE_API_KEY
    }`;
  
    return superagent
      .get(URL)
      .then(response => new Location(query, response.body.results[0]))
      .then(location => cacheLocation(location, client));
  }
  
  function cacheLocation(location, client) {
    const insertSQL = `
      INSERT INTO locations (search_query, formatted_query, latitude, longitude)
      VALUES('${location.search_query}','${location.formatted_query}', ${
      location.latitude
    }, ${location.longitude})
      RETURNING id;
  `;
  
    return client.query(insertSQL).then(results => {
      console.log("location results from db", results);
  
      console.log("location results id", results.rows[0].id);
      
      location.id = results.rows[0].id;
  
      console.log(" new location object ", location);
  
      return location;
    });
  }
  
  function Location(query, geoData) {
    this.search_query = query;
    this.formatted_query = geoData.formatted_address;
    this.latitude = geoData.geometry.location.lat;
    this.longitude = geoData.geometry.location.lng;
  }
  
  module.exports = getLocation;