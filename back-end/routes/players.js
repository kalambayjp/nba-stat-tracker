const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { selected_player } = new PrismaClient();
const axios = require("axios");
require("dotenv").config();

// GET PLAYER DATA BY TEAM

router.get("/team", async (req, res) => {
  const { teamId, season } = req.query;
  console.log("search params", teamId, season);
  const apiUrl = `https://api-nba-v1.p.rapidapi.com/players?team=${teamId}&season=${season}`;

  const config = {
    headers: {
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.SECRET_KEY,
    },
  };

  axios
    .get(apiUrl, config)
    .then((response) => {
      console.log(response);
      const allPlayers = response.data.response;
      return res.json(allPlayers);
    })
    .catch((err) => res.send(err));
});

// GET PLAYER DATA BY NAME

router.get("/name", async (req, res) => {
  const { lastName } = req.query;

  let apiUrl = `https://api-nba-v1.p.rapidapi.com/players?search=${lastName}`;

  const config = {
    headers: {
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.SECRET_KEY,
    },
  };

  axios
    .get(apiUrl, config)
    .then((response) => {
      console.log(response);
      const players = response.data.response;
      return res.json(players);
    })
    .catch((err) => res.send(err));
});

// GET USERS SELECTED PLAYERS FROM DB

router.get("/selected", async (req, res) => {
  const { userId } = req.query;

  try {
    const playerData = await selected_player.findMany({
      where: {
        user_id: parseInt(userId),
      },
      select: {
        player_identifier: true,
        id: true,
      },
    });

    res.send(playerData);
  } catch (err) {
    res.send(err);
  }
});

// ADD SELECTED PLAYER TO DB

router.post("/selected", async (req, res) => {
  const { userId, playerId } = req.query;

  try {
    const playerData = await selected_player.create({
      data: {
        user_id: parseInt(userId),
        player_identifier: parseInt(playerId),
      },
    });

    res.send(playerData);
  } catch (err) {
    res.send(err);
  }
});

// GET PLAYER STATS

router.get("/stats", async (req, res) => {
  const { playerId } = req.query;

  let apiUrl = `https://api-nba-v1.p.rapidapi.com/players/statistics`;

  const config = {
    params: { id: playerId, season: "2021" },
    headers: {
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.SECRET_KEY,
    },
  };

  axios
    .get(apiUrl, config)
    .then((response) => {
      const playerStats = response.data.response;
      return res.json(playerStats);
    })
    .catch((err) => res.send(err));
});

// DELETE SELECTED PLAYER FROM DB

router.delete("/selected/delete", async (req, res) => {
  const { id } = req.query;

  try {
    const deletedPlayer = await selected_player.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.send(deletedPlayer);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
