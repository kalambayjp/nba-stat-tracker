import axios from "axios";

export const getAllTeams = async () => {
  try {
    const allteams = await axios.get("http://localhost:8080/api/teams");
    return allteams.data;
  } catch (err) {
    console.log(err);
  }
};

export const getSelectedTeamIds = async (userId) => {
  try {
    const teamIds = await axios.get(
      `http://localhost:8080/api/teams/selected?userId=${userId}`
    );
    return teamIds.data;
  } catch (err) {
    console.log(err);
  }
};

export const getSelectedTeamData = async (teamId) => {
  try {
    const team = await axios.get(
      `http://localhost:8080/api/teams/team-data?teamId=${teamId}`
    );
    return team.data;
  } catch (err) {
    console.log(err);
  }
};

export const getUsersSelectedTeams = async (userId) => {
  const selectedTeamIds = await getSelectedTeamIds(userId);
  const teamDataPromises = selectedTeamIds.map((id) =>
    getSelectedTeamData(id.team_identifier)
  );

  return Promise.all(teamDataPromises)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const getTeamStats = async (teamId) => {
  const url = "http://localhost:8080/api/teams/team-stats?teamId=";

  try {
    const stats = await axios.get(url + teamId);
    return stats.data;
  } catch (err) {
    return err;
  }
};

export const addToSelectedTeams = async (userId, teamId) => {
  const url = "http://localhost:8080/api/teams";
  axios
    .post(url + `?userId=${userId}&teamId=${teamId}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const deleteFromSelectedTeams = async (dbTeamId) => {
  const url = "http://localhost:8080/api/teams";
  axios
    .delete(url + `?id=${dbTeamId}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
