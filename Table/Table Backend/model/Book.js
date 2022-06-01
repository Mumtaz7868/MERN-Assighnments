const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: Boolean,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  city: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Book", bookSchema);
