const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const gardenSchema = new Schema({
  title: {type: String, required: true},
  location: {type: String, required: true},
  created: {type: Date, required: true},
});

module.exports = mongoose.model('Garden', gardenSchema);

