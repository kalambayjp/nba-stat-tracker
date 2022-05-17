import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchPlayerCard = (props) => {
  const navigate = useNavigate();
  const { player } = props;
  const userId = JSON.parse(localStorage.getItem("userCreds")).userId;

  const addToSelectedPlayers = () => {
    const url = `http://localhost:8080/api/players/selected?userId=${userId}&playerId=${player.id}`;

    axios
      .post(url)
      .then(() => navigate("/profile"))
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
