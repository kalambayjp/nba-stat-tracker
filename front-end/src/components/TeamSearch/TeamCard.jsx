import { useNavigate } from "react-router-dom";
import { addToSelectedTeams } from "../../datafetching/teams";
import "./teamSearch.scss";

const TeamCard = (props) => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userCreds")).userId;

  const handleClick = () => {
    addToSelectedTeams(userId, props.id);
    navigate("/profile");
  };
  return (
    <div className="single-team">
      <img className="team-logo" src={props.logo} alt="logo" />
      {props.name}
      <button onClick={() => handleClick()}>Add to selected team(s)</button>
    </div>
  );
};

export default TeamCard;
