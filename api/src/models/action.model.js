const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const actionSchema = new Schema({
  type: {type: String, required: true},
  actionDate: {type: Date, required: true},
  user: {type: String}
});


module.exports = mongoose.model('Action', actionSchema);

