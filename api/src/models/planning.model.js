const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const planningSchema = new Schema({
  date: {type: Date, required: true},
  dateLabel: {type: String, required: true},
  isWatering: {type: Boolean, required: true},
  isCovering: {type: Boolean, required: true},
  alert: {type: Boolean, required: true},
  collaborator: {type: String},

},{ versionKey: false });

module.exports = mongoose.model('Planning', planningSchema);

