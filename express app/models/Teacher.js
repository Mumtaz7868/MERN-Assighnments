const Joi = require("joi");
const mongoose = require("mongoose");

var schema = mongoose.Schema({
  name: String,
  email: { type: String, lowercase: true },
  password: String,
  role: { type: String, default: "normal" },
});
schema.statics.validateTeacher = (data) => {
  const joischema = Joi.object({
    name: Joi.string().min(3).max(10),
    email: Joi.string(),
    password: Joi.string(),
    role: Joi.string(),
  });
  return joischema.validate(data, { abortEarly: false });
};

var Teacher = mongoose.model("Teacher", schema);

module.exports = Teacher;
// module.exports.validateProduct = validateProduct;
