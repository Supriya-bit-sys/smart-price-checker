const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  currentHolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  requestCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Book", bookSchema);
