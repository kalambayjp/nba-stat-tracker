require("dotenv").config();
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { selected_team } = new PrismaClient();
const axios = require("axios");

// GET ALL TEAM DATA

router.get("/", async (req, res) => {
  const apiUrl = `https://api-nba-v1.p.rapidapi.com/teams`;

  const config = {
    headers: {
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.SECRET_KEY,
    },
  };

  axios
    .get(apiUrl, config)
    .then((response) => {
      const allTeams = response.data.response;
      const nbaTeams = allTeams.filter(
        (team) => team.nbaFranchise && !team.allStar
      );
      return res.json(nbaTeams);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
