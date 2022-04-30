import axios from "axios";
import team from "../features/team";

export const getAllTeams = async () => {
  try {
    const allteams = await axios.get("http://localhost:8080/api/teams");
    return allteams.data;
  } catch (err) {
    console.log(err);
  }
};

export const getUsersSelectedTeamIds = async (userId) => {
  try {
    const teamIds = await axios.get(
      `http://localhost:8080/api/teams/selected?userId=${userId}`
    );
    return teamIds.data;
  } catch (err) {
    console.log(err);
  }
};

export const getUsersSelectedTeamData = async (teamId) => {
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
  const selectedTeamIds = await getUsersSelectedTeamIds(userId);
  const teamDataPromises = selectedTeamIds.map((id) =>
    getUsersSelectedTeamData(id.team_identifier)
  );

  return Promise.all(teamDataPromises)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
