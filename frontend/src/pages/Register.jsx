import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Registering...");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      setMessage(res.data.msg || "Registered successfully!");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Name" required
            className="w-full px-4 py-2 border rounded-md"
            onChange={handleChange}
          />
          <input type="email" name="email" placeholder="Email" required
            className="w-full px-4 py-2 border rounded-md"
            onChange={handleChange}
          />
          <input type="password" name="password" placeholder="Password" required
            className="w-full px-4 py-2 border rounded-md"
            onChange={handleChange}
          />
          <button type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
            Register
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
