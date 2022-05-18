import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Book.css";

const Book = (props) => {
  const history = useNavigate();
  const { _id, name, author, description, price, image } = props.book;
  const deleteHndler = async () => {
    await axios
      .delete(`http://localhost:3300/books/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/books"));
  };
  return (
    <div className="card">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={image} alt={name} />

        <Card.Body>
          <h2>By {author}</h2>
          <h3>{name}</h3>
          <p>{description}</p>
          <h3>Rs {price}</h3>
          <Button LinkComponent={Link} to={`/books/${_id}`} sx={{ mt: "auto" }}>
            Update
          </Button>
          <Button onClick={deleteHndler} sx={{ mt: "auto" }}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Book;
