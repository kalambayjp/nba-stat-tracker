import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../features/user";
import { getUsersSelectedTeams } from "../../datafetching/teams";
import axios from "axios";
// import { searchForPlayers } from "../../datafetching/players";
import Team from "./indivTeam";
import { SelectedPlayerCard } from "./SelectedPlayerCard";
import {
  formatplayerStats,
  getUsersSelectedPlayerData,
} from "../../datafetching/players";

const Profile = () => {
  // const [userCreds, setUserCreds] = useState({});
  let userCreds = {}; // use a state variable instead

  const [displayedTeams, setDisplayedTeams] = useState([]);
  const [displayedPlayers, setDisplayedPlayers] = useState([]);
  const dispatch = useDispatch();

  // check for user credentials before rendering page
  if (localStorage.getItem("userCreds")) {
    userCreds = JSON.parse(localStorage.getItem("userCreds"));
  }

  useEffect(() => {
    // update user state with user creds from local storage to persist its state through multiple renders
    dispatch(setCurrentUser({ ...userCreds }));

    // run requests for team data on renders
    async function fetchData() {
      const selectedTeams = await getUsersSelectedTeams(userCreds.userId);
      const selectedPlayers = await getUsersSelectedPlayerData(
        userCreds.userId
      );

      setDisplayedTeams(selectedTeams);
      setDisplayedPlayers(selectedPlayers);
    }
    fetchData();
  }, []);

  // redirect to login incase of user is not authenticated, (must be after useEffect)
  if (!userCreds.authenticated) {
    return <Navigate to="/login" />;
  }

  // build displayed teams element
  const diplayedTeamsElement = displayedTeams.map((team, i) => {
    return <Team key={i} team={team} />;
  });

  // build displayed players element
  const formattedDislayedPlayersData = displayedPlayers.map((player) => {
    return formatplayerStats(player);
  });
  const displayedPlayersElement = formattedDislayedPlayersData.map(
    (player, i) => {
      return <SelectedPlayerCard key={i} playerStats={player} />;
    }
  );

  return (
    <div className="profile-page">
      <div className="selected-teams">
        <h1>Selected teams</h1>
        {displayedTeams.length > 0 && diplayedTeamsElement}
        <Link to="/team-search">
          <button>add team(s)</button>
        </Link>
      </div>

      <div className="selected-players">
        <h1>Selected players</h1>
        {displayedPlayers.length > 0 && displayedPlayersElement}
        <Link to="/player-search">
          <button>add player(s)</button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
