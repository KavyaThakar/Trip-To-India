const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// Routes
const authRoutes = require("./routes/auth");
const testRoutes = require("./routes/test");
const tripRoutes = require("./routes/trip");

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/cuisine", require("./routes/cuisine"));
app.use("/api/trip", tripRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(5000, () => console.log("Server running on port 5000"));