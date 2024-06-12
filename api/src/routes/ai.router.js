const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller')

router.post('/', (req,res) => {aiController.aiBase(req, res)} );


module.exports = router;