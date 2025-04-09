import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BookList({ onEdit, refreshTrigger }) {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  const fetchBooks = () => {
    axios
      .get("http://localhost:5000/books/")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  };

  const searchBooks = () => {
    if (!query) return fetchBooks();
    axios
      .get(`http://localhost:5000/books/search?q=${query}`)
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBooks();
  }, [refreshTrigger]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      axios
        .delete(`http://localhost:5000/books/${id}`)
        .then(() => fetchBooks())
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <h2>All Books</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or author..."
        />
        <button onClick={searchBooks}>Search</button>
        <button
          onClick={() => {
            setQuery("");
            fetchBooks();
          }}
        >
          Clear
        </button>
      </div>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author} (
            {book.publication_date})<br />
            Copies: {book.available_copies} / {book.total_copies} – Status:{" "}
            {book.status}
            <br />
            <button onClick={() => onEdit(book)}>Edit</button>
            <Link to={`/books/${book.id}`}>
              <button>Details</button>
            </Link>
            <button
              onClick={() => handleDelete(book.id)}
              style={{ color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
