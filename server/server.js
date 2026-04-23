const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const authRoutes = require("./routes/auth");
const preferenceRoutes = require("./routes/preferences");
const recommendationRoutes = require("./routes/recommendation");
const itineraryRoutes = require("./routes/itinerary");
const planTripRoutes = require("./routes/planTrip");
const dashboardRoutes = require("./routes/dashboard");
const favoriteRoutes = require("./routes/favorite");
const reviewRoutes = require("./routes/review");
const profileRoutes = require("./routes/profile");
const analyticsRoutes = require("./routes/analytics");
const locationRoutes = require("./routes/location");

app.use("/api/auth", authRoutes);
app.use("/api/preferences", preferenceRoutes);
app.use("/api/recommendation", recommendationRoutes);
app.use("/api/itinerary", itineraryRoutes);
app.use("/api/plan-trip", planTripRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/location", locationRoutes);

// test route
app.get("/", (req, res) => {
  res.send("TripToIndia API Running 🚀");
});

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Connection Error ❌:", err));

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});