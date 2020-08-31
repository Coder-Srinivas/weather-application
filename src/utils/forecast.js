const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.openweathermap.org/data/2.5/onecall?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&exclude=hourly,daily&units=metric&APPID=e6bc9a6428a00d954f3d51def44accf1";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Please check your internet connection", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      const data = response.body;
      callback(
        undefined,
        "Current Temperature is " +
          data.current.temp +
          " degrees Celsius. There is a " +
          data.minutely[data.minutely.length - 1].precipitation +
          "% chance of rain"
      );
    }
  });
};

module.exports = forecast;
