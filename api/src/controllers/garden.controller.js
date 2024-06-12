const Garden = require('../models/garden.model')

const getGardenById = async (req, res) => {
    let garden = await Garden.findById(req.params.gardenId)
    res.send(garden);
}

const createGarden = async (req, res) => {
    let garden = await Garden.create({
        title: req.body.title,
        location: req.body.location,
        created: req.body.created
    })
    res.send(garden)
}

module.exports = {
    getGardenById,
    createGarden
}