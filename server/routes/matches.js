// server/routes/matches.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

// Ensure your .env contains:
// SPORTSDB_API=https://www.thesportsdb.com/api/v1/json/123
const API_BASE_URL = process.env.SPORTSDB_API;

router.get("/", async (req, res) => {
  const teamName = req.query.t; // e.g. /api/matches?t=Arsenal
  if (!teamName) {
    return res
      .status(400)
      .json({ error: "Missing required query parameter 't' (team name)" });
  }

  const url = `${API_BASE_URL}/searchteams.php?t=${encodeURIComponent(
    teamName
  )}`;
  console.log("Fetching data from:", url);

  try {
    const { data } = await axios.get(url);
    const teams = data.teams;

    if (!Array.isArray(teams) || teams.length === 0) {
      return res.status(404).json({ error: "No teams found for that name" });
    }

    const formatted = teams.map((team) => ({
      id: team.idTeam,
      name: team.strTeam,
      country: team.strCountry,
      league: team.strLeague,
      stadium: team.strStadium,
      formedYear: team.intFormedYear,
      badgeUrl: team.strTeamBadge,
      description: team.strDescriptionEN,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching team data:", err.message);
    res.status(500).json({ error: "Failed to fetch team data" });
  }
});

module.exports = router;
