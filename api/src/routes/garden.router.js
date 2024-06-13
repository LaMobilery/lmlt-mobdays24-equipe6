const express = require('express');
const router = express.Router();
const gardenController = require('../controllers/garden.controller')

router.get('/:gardenId', (req,res) => {gardenController.getGardenById(req, res)} );

router.post('/', (req,res) => {gardenController.createGarden(req, res)});

router.post('/:gardenId', (req, res) => {gardenController.addVegetable(req, res)})

module.exports = router;