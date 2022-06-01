const Book = require("../model/Book");

const getAllBooks = async (req, res, next) => {
  let books;
  try {
    books = await Book.find();
  } catch (err) {
    console.log(err.message);
  }
  if (!books) {
    return res.status(404).json({ message: "No products found" });
  }
  return res.status(200).json({ books });
};
const getById = async (req, res, next) => {
  const id = req.params.id;
  let books;
  try {
    books = await Book.findById(id);
  } catch (err) {
    console.log(err.message);
  }
  if (!books) {
    return res.status(404).json({ message: "No book found" });
  }
  return res.status(200).json({ books });
};

const addBook = async (req, res, next) => {
  const { name, gender, age, city } = req.body;
  let book;
  try {
    book = new Book({
      name,
      gender,
      age,
      city,
    });
    await book.save();
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(500).json({ message: "Unable To Add" });
  }
  return res.status(201).json({ book });
};
const updateBook = async (req, res, next) => {
  const id = req.params.id;
  const { name, gender, age, city } = req.body;
  let book;
  try {
    book = await Book.findByIdAndUpdate(id, {
      name,
      gender,
      age,
      city,
    });
    await book.save();
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(500).json({ message: "Unable To Update" });
  }
  return res.status(201).json({ message: req.body });
};
const deleteBook = async (req, res, next) => {
  const id = req.params.id;
  let books;
  try {
    books = await Book.findByIdAndDelete(id);
  } catch (err) {
    console.log(err.message);
  }
  if (!books) {
    return res
      .status(404)
      .json({ message: " Unable To delete book by this id" });
  }
  return res.status(200).json({ message: "Book successfully deleted" });
};

exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getById = getById;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
