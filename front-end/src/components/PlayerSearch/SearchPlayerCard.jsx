import axios from "axios";
import { useSelector } from "react-redux";

const SearchPlayerCard = (props) => {
  const { player } = props;
  const userId = JSON.parse(localStorage.getItem("userCreds")).userId;

  const addToSelectedPlayers = () => {
    const url = `http://localhost:8080/api/players/selected?userId=${userId}&playerId=${player.id}`;
    console.log("here");
    axios
      .post(url)
      .then(() => console.log("works"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="player-card">
      <table>
        <tbody>
          <tr>
            <td>
              <p className="player-info"></p>
              {player.firstname + " " + player.lastname}
            </td>
            <td>
              Pos:{" "}
              {player.leagues.standard ? player.leagues.standard.pos : "N/A"}
            </td>
            <td>
              Height:
              {player.height ? player.height.feets : "N/A"}-
              {player.height ? player.height.inches : "N/A"}
            </td>
            <td>Weight: {player.weight ? player.weight.pounds : "N/A"}</td>
            <td>Exp: {player.nba ? player.nba.pro : "N/A"}</td>
            <td>{player.birth ? player.birth.country : "N/A"}</td>
            <td>
              <button onClick={() => addToSelectedPlayers()}>Add Player</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SearchPlayerCard;
