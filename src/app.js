const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, "../public");
const partialDirectoryPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDirectoryPath));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(partialDirectoryPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather Application",
    name: "Srinivas",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Srinivas",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Srinivas",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }

    forecast(latitude, longitude, (error, response) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      return res.send({
        forecast: response,
        location: place,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "Srinivas",
    title: "404",
  });
});

app.listen(port, () => {
  console.log("Listenning on port " + port);
});
