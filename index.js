const express = require("express");
const app = express();
const PORT = 8080;
const weatherRoutes = require("./routes/weatherRoutes");
const cors = require("cors");

// This middleware allows any origin (front-end) to interact with our API
app.use(cors());

// This middleware allows us to post JSON in request.body
app.use(express.json());

// This middleware is a basic example that runs on every request
// Calling next() is how you pass control to the next middleware
app.use((req, res, next) => {
  console.log(
    "Welcome to the weather app! With this CLI tool, you can quickly get up-to-date weather information for any location. Simply enter a city or data and we'll give you the latest weather data, including temperature, humidity, and wind speed. Let's get started!"
  );
  next();
});

// To use routing, we define the endpoint using middleware syntax.
// The first paramater is the path, and the second is the router module.
// Your routes will be available at this path slash whatever your router endpoints are.
app.use("/weather", weatherRoutes);

// Start the server listening
// It's convention to have this at the end of the file
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
