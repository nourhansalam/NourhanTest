import React, { useState, useEffect } from "react";
import axios from "axios";

function BookForm({ selectedBook, refresh }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    publication_date: "",
    total_copies: 1,
  });

  useEffect(() => {
    if (selectedBook) {
      setForm({
        title: selectedBook.title,
        author: selectedBook.author,
        publication_date: selectedBook.publication_date,
        total_copies: selectedBook.total_copies,
      });
    }
  }, [selectedBook]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = selectedBook ? "put" : "post";
    const url = selectedBook
      ? `http://localhost:5000/books/${selectedBook.id}`
      : "http://localhost:5000/books/";

    axios[method](url, form)
      .then(() => {
        setForm({
          title: "",
          author: "",
          publication_date: "",
          total_copies: 1,
        });
        refresh();
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedBook ? "Edit" : "Add"} Book</h2>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="Author"
        required
      />
      <input
        name="publication_date"
        type="date"
        value={form.publication_date}
        onChange={handleChange}
      />
      <input
        name="total_copies"
        type="number"
        value={form.total_copies}
        onChange={handleChange}
      />
      <button type="submit">{selectedBook ? "Update" : "Add"}</button>
    </form>
  );
}

export default BookForm;
