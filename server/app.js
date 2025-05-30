const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load .env variables before anything else

const matchRoutes = require("./routes/matches");

const app = express();

app.use(cors());
app.use(express.json());

// Mount matchRoutes at /api/matches
app.use("/api/matches", matchRoutes);

// Fallback route for unknown endpoints (optional, for cleaner error handling)
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
