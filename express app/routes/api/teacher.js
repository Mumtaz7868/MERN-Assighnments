var express = require("express");
var router = express.Router();
const Teacher = require("../../models/Teacher");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
router.get("/signup", async (req, res) => {
  try {
    let result = new Teacher();
    result.email = req.body.email;
    result.name = req.body.name;
    let salt = await bcrypt.genSalt(10);
    result.password = await bcrypt.hash(req.body.password, salt);
    result = await result.save();
    result = _.pick(result, ["name", "email", "role", "_id"]);
    res.send(result);
  } catch (err) {
    res.status(401).send(err);
  }
});

router.get("/signin", async (req, res) => {
  try {
    let { email, password } = req.body;

    let result = await Teacher.findOne({ email: email });
    if (!result) {
      res.status(404).send("User with given email was not found");
    }

    let isValid = await bcrypt.compare(password, result.password);
    if (!isValid) {
      res.status(404).send("Invalid Password");
    }

    result = _.pick(result, ["name", "email", "role", "_id"]);

    res.send(result);
  } catch (err) {
    res.status(401).send(err.message);
  }
});
router.get("/", async function (req, res) {
  try {
    // console.log(req.query);
    let page = Number(req.query.page);
    let perPage = Number(req.query.perPage);

    page = (page - 1) * perPage;
    // console.log(page, perPage);

    let result = await Teacher.find(req.body).skip(page).limit(perPage);

    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});
router.get("/:id", async function (req, res) {
  try {
    let result = await Teacher.findById(req.params.id);
    if (!result) {
      res.status(400).send("Product with given ID not found");
    }
    res.send(result);
  } catch (err) {
    console.log(err.message);
    // res.status(400).send(err.message);
    res.status(400).send("The format of id is not correct");
  }
});
router.put("/:id", async function (req, res) {
  try {
    let result = await Teacher.findById(req.params.id);
    if (!result) {
      res.status(400).send("The record with given id was not found");
    }

    //Another way to do this
    // result.name = req.body.name;
    // result.price = req.body.price;
    // result = await result.save();

    //{new:true} is an option to get updated data from
    //findByIdAndUpdate function. Otherwise it will return old data.
    result = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});
router.delete("/:id", async function (req, res) {
  try {
    let result = await Teacher.findById(req.params.id);
    if (!result) {
      res.status(400).send("record with given ID not found");
    }
    result = await Teacher.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
    // res.status(400).send("The format of id is not correct");
  }
});

module.exports = router;
