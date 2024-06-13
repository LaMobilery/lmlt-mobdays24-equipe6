const Garden = require('../models/garden.model')
const Action = require('../models/action.model')

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

const getLastActions = async (req,res) => {
  let action = await Action.find({}).sort({"actionDate": -1}).limit(10);
  res.send(action);
}

const createAction = async (req, res) => {
  let action = await createActionFunction(req.type, req.actionDate, req.user);
  res.send(action);
}

async function createActionFunction(actionType, actionDate, actionUser) {
  
  let action = await Action.create({
    type: actionType,
    actionDate: actionDate,
    user: actionUser ? actionUser : null
  })
  return action;
}

const addVegetable = async (req, res) => {
    console.log(req);
    try {
        const garden = await Garden.findByIdAndUpdate(
            req.params.gardenId,
            { $push: { vegetable: { 
                maturity: req.body.maturity,
                plantationDate: getPlantationDate(req.body.maturity),
                name: req.body.name,
                garden: req.params.id
             } } },
            { new: true, useFindAndModify: false }
          )
          if (garden) {
            res.send(200, garden);
          } else {
            res.send(404, {'msg' : 'garden not found'})
          }
        } catch (err) {
          throw  new Error('Erreur lors de la mise à jour du jardin:', err);
        }
}

const getPlantationDate = (maturity) => {
    const today = new Date();
    today.setDate(today.getDate() - maturity);
    return today;
}

module.exports = {
    getGardenById,
    createGarden,
    addVegetable,
    getLastActions,
    createAction,
    createActionFunction
}