const request = require("request");
const geocode = require("./geocode");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=e8e0447bc15a70b21043703c26c0842a&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to location services", undefined);
    } else if (body.error) {
      callback("unable to locate the location", undefined);
    } else {
      console.log(body.current);
      callback(
        undefined,
        "it is currently " +
          body.current.temperature +
          " degrees out and the weather is " +
          body.current.weather_descriptions[0] +
          ". this high today is " +
          body.current.feelslike
      );
    }
  });
};

module.exports = forecast;
