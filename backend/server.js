const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log("🚀 Server running on 5000")))
  .catch(err => console.error(err));
