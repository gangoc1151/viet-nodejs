const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoidmlldHBybzl4ZCIsImEiOiJja2NuaDB4ZzcwMXN6MnFvYnp5cXRlc3FuIn0.Tt8ZwZEjavRXp7F_ma7ycw&limit=1";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to location services", undefined);
    } else if (body.features.length == 0) {
      callback("unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
