import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: ""
  });
  const [message, setMessage] = useState("");
  const [books, setBooks] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Uploading...");
    try {
      await axios.post("http://localhost:5000/api/books/add", formData, {
        headers: { Authorization: token }
      });
      setMessage("Book added successfully!");
      setFormData({ title: "", author: "", description: "" });
      fetchBooks();
    } catch (err) {
      setMessage("Failed to add book");
    }
  };

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      const userId = JSON.parse(localStorage.getItem("user"))?.id;
      const userBooks = res.data.filter(b => b.issuedBy._id === userId);
      setBooks(userBooks);
    } catch (err) {
      console.log("Error fetching books:", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">📚 Dashboard</h2>
          <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">
            Logout
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3 mb-6">
          <input type="text" name="title" placeholder="Book Title" required
            className="w-full border px-3 py-2 rounded"
            value={formData.title} onChange={handleChange}
          />
          <input type="text" name="author" placeholder="Author" required
            className="w-full border px-3 py-2 rounded"
            value={formData.author} onChange={handleChange}
          />
          <textarea name="description" placeholder="Description" required
            className="w-full border px-3 py-2 rounded"
            value={formData.description} onChange={handleChange}
          ></textarea>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Add Book
          </button>
        </form>
        {message && <p className="text-center mb-4">{message}</p>}
        <div>
          <h3 className="font-semibold mb-2">📦 Your Uploaded Books:</h3>
          {books.length === 0 ? <p>No books uploaded yet.</p> :
            books.map((book, index) => (
              <div key={index} className="bg-gray-100 p-3 mb-2 rounded">
                <p className="font-bold">{book.title}</p>
                <p>{book.author}</p>
                <p className="text-sm text-gray-600">{book.description}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
