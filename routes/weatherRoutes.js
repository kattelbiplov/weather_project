// weatherRoutes.js

const express = require('express');
const router = express.Router();
const { fetchWeatherData } = require('../controllers/weatherController');

// Define route handler for /weather endpoint
router.route('/weather')
  .get(async (req, res) => {
    try {
      // Extract location data from request query parameters
      const { country, state, city } = req.query;

      // Call fetchWeatherData function to fetch weather data based on location
      const weatherData = await fetchWeatherData(country, state, city);

      // Send weather data as response
      res.json(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  })
  .post(async (req, res) => {
    try {
      // Extract location data from request body
      const { country, state, city } = req.body;

      // Call fetchWeatherData function to fetch weather data based on location
      const weatherData = await fetchWeatherData(country, state, city);

      // Send weather data as response
      res.json(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
