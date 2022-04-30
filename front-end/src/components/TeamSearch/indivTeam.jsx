import "./indivTeam.scss";

const Team = (props) => {
  return (
    <div className="team-card">
      <img className="team-logo" src={props.team["0"].logo} alt="logo" />
      <h1 className="team-name">{props.team["0"].name}</h1>
    </div>
  );
};

export default Team;
