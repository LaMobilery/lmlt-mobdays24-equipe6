const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const vegetableSchema = new Schema({
  type: {type: String, required: true},
  plantedAt: {type: Date, required: true},
  name: {type: String, required: true},
  garden: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Garden'
  }
});

module.exports = mongoose.model('Vegetable', vegetableSchema);