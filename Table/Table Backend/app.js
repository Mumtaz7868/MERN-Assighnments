const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/book_routes");
const app = express();
const cors = require("cors");

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/Table", router);

mongoose
  .connect("mongodb://localhost/Table")
  .then(() => console.log("Connected To DataBase"))
  .then(() => {
    app.listen(3300);
  })
  .catch((err) => console.log(err));

module.exports = app;
