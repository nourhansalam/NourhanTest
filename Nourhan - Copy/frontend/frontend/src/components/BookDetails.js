import React, { useEffect, useState } from "react";
import axios from "axios";

function BookDetails({ bookId }) {
  const [book, setBook] = useState(null);
  const [borrowQty, setBorrowQty] = useState(1);
  const [returnQty, setReturnQty] = useState(1);
  const [message, setMessage] = useState("");

  const fetchBook = () => {
    axios
      .get(`http://localhost:5000/books/${bookId}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (bookId) fetchBook();
  }, [bookId]);

  const handleBorrow = () => {
    axios
      .post(`http://localhost:5000/books/${bookId}/borrow`, {
        quantity: borrowQty,
      })
      .then((res) => {
        setMessage(res.data.message);
        fetchBook();
      })
      .catch((err) =>
        setMessage(err.response?.data?.error || "Error borrowing")
      );
  };

  const handleReturn = () => {
    axios
      .post(`http://localhost:5000/books/${bookId}/return`, {
        quantity: returnQty,
      })
      .then((res) => {
        setMessage(res.data.message);
        fetchBook();
      })
      .catch((err) =>
        setMessage(err.response?.data?.error || "Error returning")
      );
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h3>Book Details</h3>
      <p>
        <strong>Title:</strong> {book.title}
      </p>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Publication Date:</strong> {book.publication_date}
      </p>
      <p>
        <strong>Status:</strong> {book.status}
      </p>
      <p>
        <strong>Copies:</strong> {book.available_copies} / {book.total_copies}
      </p>
      <p>
        <strong>Borrowed:</strong> {book.borrowed_copies}
      </p>

      <div style={{ marginTop: "1rem" }}>
        <h4>Borrow Copies</h4>
        <input
          type="number"
          value={borrowQty}
          onChange={(e) => setBorrowQty(Number(e.target.value))}
          min={1}
          max={book.available_copies}
        />
        <button onClick={handleBorrow}>Borrow</button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <h4>Return Copies</h4>
        <input
          type="number"
          value={returnQty}
          onChange={(e) => setReturnQty(Number(e.target.value))}
          min={1}
          max={book.borrowed_copies}
        />
        <button onClick={handleReturn}>Return</button>
      </div>

      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}

export default BookDetails;
