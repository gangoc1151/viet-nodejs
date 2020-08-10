const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "VIet",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about me",
    name: "Viet",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: " Please provide your address ",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        //or use return console.log(error) and do not need else statement
        return res.send({ error });
      }
      console.log("error", error);
      console.log("data", location);
      forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return console.log(error);
        }
        console.log("error", error);
        console.log(forecastdata);
        return res.send({
          location,
          address: req.query.address,
          forecast: forecastdata,
        });
      });
    }
  );
  // res.send({
  //   location: req.query.address,
  //   weather: "sunny",
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      rerror: "you must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: ["games"],
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "gooooooood",
    title: "Help",
    name: "Andrew",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "help artical not found",
    name: "Viet",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "page not found",
    name: "Viet",
  });
});

// app.com
// app.com/help
//app.com/about

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
