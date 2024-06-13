const getWeatherForNextDays = async (req, res) => {
  try {
    const response = await getWeather();
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};

async function getWeather() {
  const response = await fetch(
    process.env.METEO_BASE_URL +
      "forecast/daily?token=" +
      process.env.METEO_TOKEN +
      "&insee=" +
      process.env.INSEE,
    {
      method: "GET",
      headers: {},
    }
  );

  return await response.json();
}

module.exports = {
  getWeatherForNextDays,
  getWeather,
};
