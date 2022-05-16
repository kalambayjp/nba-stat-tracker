require("dotenv").config();
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { selected_team } = new PrismaClient();
const axios = require("axios");

// GET ALL TEAM DATA FROM NBA API

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

// ADD TO SELECTED TEAMS TO DB

router.post("/", async (req, res) => {
  const { userId, teamId } = req.query;

  try {
    const teamData = await selected_team.create({
      data: {
        user_id: parseInt(userId),
        team_identifier: parseInt(teamId),
      },
    });

    res.send("success");
  } catch (err) {
    res.send(err);
  }
});

// DELETE SELECTED TEAM FROM DB

router.delete("/", async (req, res) => {
  const { id } = req.query;

  try {
    const team = await selected_team.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.send("success");
  } catch (err) {
    res.send(err);
  }
});

// GET SELECTED TEAM DATA FROM DB

router.get("/selected", async (req, res) => {
  const { userId } = req.query;

  try {
    const teamData = await selected_team.findMany({
      where: {
        user_id: parseInt(userId),
      },
      select: {
        team_identifier: true,
      },
    });

    res.send(teamData);
  } catch (err) {
    res.send(err);
  }
});

// GET SELECTED TEAM DATA FROM API

router.get("/team-data", async (req, res) => {
  const { teamId } = req.query;
  const apiUrl = `https://api-nba-v1.p.rapidapi.com/teams`;

  const config = {
    params: { id: teamId },
    headers: {
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.SECRET_KEY,
    },
  };

  axios
    .get(apiUrl, config)
    .then((response) => {
      const teamData = response.data.response;
      return res.json(teamData);
    })
    .catch((err) => res.send(err));
});

// GET SELECTED TEAM STATS FROM API

router.get("/team-stats", async (req, res) => {
  const { teamId } = req.query;
  const apiUrl = "https://api-nba-v1.p.rapidapi.com/teams/statistics";

  const config = {
    params: { id: teamId, season: "2021" },
    headers: {
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.SECRET_KEY,
    },
  };

  axios
    .get(apiUrl, config)
    .then((response) => {
      const teamStats = response.data.response;

      return res.json(teamStats);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
