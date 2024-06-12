const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const vegetableSchema = new Schema({
  maturity: {type: String, required: true},
  plantationDate: {type: Date, required: true},
  name: {type: String, required: true},
  recipe: {type: String},
  description: {type: String},
  harvestDate: {type:String},
});

const gardenSchema = new Schema({
  title: {type: String, required: true},
  location: {type: String, required: true},
  created: {type: Date, required: true},
  vegetable: [vegetableSchema]
});

module.exports = mongoose.model('Garden', gardenSchema);

