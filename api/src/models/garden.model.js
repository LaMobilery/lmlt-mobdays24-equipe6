const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const gardenSchema = new Schema({
  id: ObjectId,
  title: {type: String, required: true},
  location: {type: String, required: true},
  created: {type: Date, required: true},
});

const Garden = mongoose.model('Garden', gardenSchema);

module.exports = Garden;