import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import BookDetails from "./components/BookDetails";
import { useState } from "react";
import axios from "axios";

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refresh = () => {
    setSelectedBook(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <Router>
      <h1>📚 Book Management</h1>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <BookForm selectedBook={selectedBook} refresh={refresh} />
              <BookList
                onEdit={setSelectedBook}
                refreshTrigger={refreshTrigger}
              />
            </>
          }
        />
        <Route path="/books/:id" element={<BookDetailsPage />} />
      </Routes>
    </Router>
  );
}

function BookDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        setDeleted(true);
        setTimeout(() => navigate("/"), 1000);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <BookDetails bookId={id} />
      {!deleted && (
        <>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </>
      )}
      {deleted && <p>Book deleted. Redirecting...</p>}
    </div>
  );
}

export default App;
