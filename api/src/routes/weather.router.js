const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weather.controller')

router.get('/', (req,res) => {weatherController.getWeatherForNextDays(req, res)} );

module.exports = router;