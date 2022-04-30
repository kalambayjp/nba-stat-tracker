import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../features/user";
import { getUsersSelectedTeams } from "../../datafetching/teams";
import axios from "axios";
// import { searchForPlayers } from "../../datafetching/players";
import Team from "../TeamSearch/indivTeam";

const Profile = () => {
  // const [userCreds, setUserCreds] = useState({});
  let userCreds = {}; // use a state variable instead

  const [displayedTeams, setDisplayedTeams] = useState([]);
  const [displayedPlayers, setDisplayedPlayers] = useState([]);
  const [playerSearch, setPlayerSearch] = useState("");
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

      setDisplayedTeams(selectedTeams);
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

  const searchForPlayers = async (e) => {
    try {
      e.preventDefault();
      const url = "http://localhost:8080/api/players/name?lastName=";
      axios
        .get(url + playerSearch)
        .then((res) => setDisplayedPlayers(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  console.log(displayedPlayers);

  return (
    <div className="profile-page">
      <div className="selected-teams">
        <h1>Selected teams</h1>
        {displayedTeams.length > 0 && diplayedTeamsElement}
      </div>
      <div className="selected-players">
        <h1>Selected players</h1>
        <form onSubmit={searchForPlayers}>
          <label for="search">Add players to your list</label>
          <input
            type="text"
            name="search"
            value={playerSearch}
            onChange={(e) => setPlayerSearch(e.target.value)}
            placeholder="Search by last name"
          />
          <button type="submit" value="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
