const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { selected_team } = new PrismaClient();
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
  // if (firstName) {
  //   // both cases
  //   if (lastName) {
  //     apiUrl = `https://api-nba-v1.p.rapidapi.com/players?firstname=${firstName}&lastname=${lastName}`;
  //   }
  //   // only first name
  //   apiUrl = `https://api-nba-v1.p.rapidapi.com/players?firstname=${firstName}`;

  //   // only last name
  // } else if (lastName) {
  //   apiUrl = `https://api-nba-v1.p.rapidapi.com/players?lastname=${lastName}`;
  // }

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

module.exports = router;
