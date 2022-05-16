import axios from "axios";

export const getSelectedPlayerIds = async (userId) => {
  try {
    const url = "http://localhost:8080/api/players/selected?userId=";
    const playerIds = await axios.get(url + userId);

    return playerIds.data;
  } catch (err) {
    console.log(err);
  }
};

const getPlayerStats = async (playerId) => {
  try {
    const url = "http://localhost:8080/api/players/stats?playerId=";
    const playerStats = await axios.get(url + playerId);
    return playerStats.data;
  } catch (err) {
    console.log(err);
  }
};

export const getUsersSelectedPlayerData = async (userId) => {
  const selectedPlayerIds = await getSelectedPlayerIds(userId);
  const playerDataPromises = selectedPlayerIds.map((id) =>
    getPlayerStats(id.player_identifier)
  );

  return Promise.all(playerDataPromises)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

const calcAvg = (arr, stat) => {
  let totalPts = 0;

  for (let i = 0; i < arr.length; i++) {
    totalPts += arr[i][stat];
  }

  let avgPts = totalPts / arr.length;
  return avgPts;
};

export const formatplayerStats = (stats) => {
  let formattedStats = {
    name: `${stats["0"].player.firstname} ${stats["0"].player.lastname}`,
    avgPts: calcAvg(stats, "points").toFixed(1),
    avgReb: calcAvg(stats, "totReb").toFixed(1),
    avgAssists: calcAvg(stats, "assists").toFixed(1),
    avgStl: calcAvg(stats, "steals").toFixed(1),
    avgBlocks: calcAvg(stats, "blocks").toFixed(1),
    avgFGM: calcAvg(stats, "fgm").toFixed(1),
    avgFGA: calcAvg(stats, "fga").toFixed(1),
    avgTO: calcAvg(stats, "turnovers").toFixed(1),
    gp: stats.length,
    lastTenGames: stats.slice(stats.length - 10, stats.length),
    id: stats["0"].player.id,
  };

  return formattedStats;
};

export const formatplayerTrendStats = (stats) => {
  let formattedStats = {
    avgPts: calcAvg(stats, "points").toFixed(1),
    avgReb: calcAvg(stats, "totReb").toFixed(1),
    avgAssists: calcAvg(stats, "assists").toFixed(1),
    avgStl: calcAvg(stats, "steals").toFixed(1),
    avgBlocks: calcAvg(stats, "blocks").toFixed(1),
    avgFGM: calcAvg(stats, "fgm").toFixed(1),
    avgFGA: calcAvg(stats, "fga").toFixed(1),
    avgTO: calcAvg(stats, "turnovers").toFixed(1),
    gp: stats.length,
  };

  return formattedStats;
};
