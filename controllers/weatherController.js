const axios = require('axios');

async function fetchWeatherData(country, state, city) {
  try {
    const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
      params: {
        key: 'd2a1388502d84fe58e9195933242702', //weather api key
        q: `${city},${state},${country}`,
      },
    });

    const { temp_c, condition } = response.data.current;

    const weatherData = {
      temperature: temp_c,
      condition: condition.text,
    };

    return weatherData;
  } catch (error) {
    throw new Error('Error fetching weather data from API');
  }
}

module.exports = { fetchWeatherData };
