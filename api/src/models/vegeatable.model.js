const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const vegetableSchema = new Schema({
  id: ObjectId,
  type: {type: String, required: true},
  plantedAt: {type: Date, required: true},
  name: {type: String, required: true},
  garden: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Garden'
  }
});

const Vegetable = mongoose.model('Vegetable', vegetableSchema);

module.exports = Vegetable;