const express = require('express');
const router = express.Router();
const planningController = require('../controllers/planning.controller')

router.get('/', (req,res) => {planningController.getPlanning(req, res)} );

module.exports = router;