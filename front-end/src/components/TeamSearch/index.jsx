import { useEffect, useState } from "react";
import Team from "./indivTeam";

import { getAllTeams } from "../../datafetching/teams";
import "./index.scss";

const TeamSearch = () => {
  const [displayedTeams, setDisplayedTeams] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const nbaTeams = await getAllTeams();

      setDisplayedTeams(nbaTeams);
    }
    fetchData();
  }, []);

  return (
    <div className="team-list">
      <h1>Teams</h1>
      {displayedTeams.map((team, i) => {
        return <Team key={i} name={team.name} logo={team.logo} />;
      })}
    </div>
  );
};

export default TeamSearch;
