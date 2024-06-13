const express = require('express');
const router = express.Router();
const actionController = require('../controllers/garden.controller')

router.get('/', (req,res) => {actionController.getLastActions(req, res)} );

router.post('/', (req,res) => {actionController.createAction(req, res)});

module.exports = router;