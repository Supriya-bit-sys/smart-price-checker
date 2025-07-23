const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const authMiddleware = require("../middleware/auth");

router.post("/add", authMiddleware, async (req, res) => {
  console.log("📚 POST /api/books/add", req.body);

  try {
    const book = await Book.create({
      ...req.body,
      currentHolder: req.user.id,
    });
    res.json(book);
  } catch (err) {
    console.error("❌ Error in /add:", err);
    res.status(500).json({ msg: "Failed to add book" });
  }
});

module.exports = router;
