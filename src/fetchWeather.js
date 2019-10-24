'use strict';

export default function(coordinates) {
  // Location Name	query = New York	The standard way of passing a location name to the API.
  // Coordinates (Lat/Lon)	query = 40.7831,-73.9712

  const ACCESS_KEY = 'bb8dce5fca9942ada2d61212192410';

  return new Promise((resolve, reject) => {
    fetch(
      `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${ACCESS_KEY}&q=${coordinates}&format=json`,
    ).then(response => {
      console.log();
      response.json().then(resp => {
        if (!resp.data.error) resolve(resp);
        else {
          reject(resp.data.error[0].msg);
        }
      });
    });
  });
}
