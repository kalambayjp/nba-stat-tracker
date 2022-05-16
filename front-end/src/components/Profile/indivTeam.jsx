import { useEffect, useState } from "react";
import { getTeamStats } from "../../datafetching/teams";
import "./indivTeam.scss";

const Team = (props) => {
  const [teamStats, setTeamStats] = useState([]);
  // const ppg = teamStatsArray.points / teamStatsArray.games;

  useEffect(() => {
    // setTeamStats(getTeamStats(props.team["0"].id));

    async function fetchData() {
      const stats = await getTeamStats(props.team["0"].id);

      setTeamStats(stats);
    }
    fetchData();
  }, []);

  console.log(props);

  const handleClick = () => {};

  return (
    <div className="team-card">
      <img className="team-logo" src={props.team["0"].logo} alt="logo" />
      <div className="team-info">
        <h1 className="team-name">{props.team["0"].name}</h1>
        {teamStats.length > 0 && (
          <div>
            <p>
              PPG: {(teamStats["0"].points / teamStats["0"].games).toFixed(1)}
            </p>
            <button onClick={() => handleClick()}>delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
