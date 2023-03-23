const express = require("express");
const router = express.Router(); // To use router, instantiate it like this
const fs = require("fs");
const crypto = require("crypto");

// Re-usable function to read our data file
function readData() {
  const forecasts = fs.readFileSync("./data/forecasts.json");
  const parsedData = JSON.parse(forecasts);
  return parsedData;
}

// GET endpoint for all weather forecast
router.get("/", (_req, res) => {
  const forecasts = readData();
  res.json(forecasts);
});

// GET /weather/{city}
router.get("/:city", (req, res) => {
  const city = req.params.city;
  // Code to fetch weather data for the specified city from the database or API
  const weatherData = readData();
  const cityForeCast = weatherData.find((weather) => {
    return weather.city === city;
  });
  if (cityForeCast) {
    res.status(200).json(cityForeCast);
  } else {
    res
      .status(404)
      .json({ error: "Weather data not found for the specified city" });
  }
});

// POST /weather
router.post("/", (req, res) => {
  const weatherData = req.body;

  const forecasts = readData();
  forecasts.push(weatherData);

  // Code to write weather data to a JSON file
  fs.writeFile("./data/forecasts.json", JSON.stringify(weatherData), (err) => {
    if (err) {
      res.status(500).json({ error: "Error writing weather data to file" });
    } else {
      res.status(200).json({ message: "Weather data saved successfully" });
    }
  });
});

// DELETE endpoint to remove an individual note
router.delete("/:id", (req, res) => {
  /* TODO: ACTUALLY DELETE FORCAST */
  // 1. Read from the file
  // 2. Mutate the array to remove the note with that id
  // 3. Write the new array to the file

  // Respond with a message that the note has been deleted
  res.send("This will delete the forecast whose ID is " + req.params.id);
});

// Finally, export the router for use in index.js
module.exports = router;
