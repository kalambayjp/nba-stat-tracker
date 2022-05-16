import { useEffect, useState } from "react";
import { getAllTeams } from "../../datafetching/teams";
import TeamCard from "./TeamCard";
import "./teamSearch.scss";

const TeamSearch = () => {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const nbaTeams = await getAllTeams();
      setTeams(nbaTeams);
    }
    fetchData();
  }, []);

  const displayedTeams = teams.map((team) => {
    return (
      <TeamCard
        key={team.name + team.id}
        id={team.id}
        name={team.name}
        logo={team.logo}
      />
    );
  });

  return (
    <div className="team-list">
      {displayedTeams.length > 0 && displayedTeams}
    </div>
  );
};
export default TeamSearch;
