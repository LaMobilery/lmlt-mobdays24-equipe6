// const Garden = require('../models/garden.model')

const getWeatherForNextDays = async (req, res) => {

  try {
    const response = await fetch(
      process.env.METEO_BASE_URL +
        "forecast/daily?token=" +
        process.env.METEO_TOKEN +
        "&insee=" +
        process.env.INSEE, {
            method: 'GET', headers: {}
        }
    );

    const data = await response.json();
    res.send(data);

  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getWeatherForNextDays,
};
