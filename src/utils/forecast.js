const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.openweathermap.org/data/2.5/onecall?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&exclude=hourly&units=metric&APPID=e6bc9a6428a00d954f3d51def44accf1";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Please check your internet connection", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      const data = response.body;
      console.log(data.current.weather)
      callback(
        undefined,
        "Current weather is " + data.current.weather[0].description + 
        ".  Current Temperature is " +
          data.current.temp +
          " degrees Celsius. \n"
          +"  Perceived Temperature " + data.current.feels_like + " degrees Celsius. " + "\n"
          + "  Humidity is " + data.current.humidity + "%. " + "\n"
          + "  Pressure is " + data.current.pressure + "hPa. " + "\n"
          + "  Wind Speed is " + data.current.wind_speed + "km/h. "
      );
    }
  });
};

module.exports = forecast;
