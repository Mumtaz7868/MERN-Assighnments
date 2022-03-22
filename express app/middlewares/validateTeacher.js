const Teacher = require("../models/Teacher");
module.exports = function (req, res, next) {
  let { error } = Teacher.validateTeacher(req.body);
  if (error) {
    console.log(error);
    res.status(401).send(error.message);
  }
  next();
};
