import axios from "axios";
import { useState } from "react";
import { formatplayerTrendStats } from "../../datafetching/players";
import { getSelectedPlayerIds } from "../../datafetching/players";
import "./selectedPlayerCard.scss";

export const SelectedPlayerCard = (props) => {
  const { playerStats } = props;
  // console.log(playerStats);
  const [userInputValue, setUserInputValue] = useState(0);
  const [showTrendStats, setShowTrendStats] = useState(false);
  const [formattedTrendStats, setFormattedTrendStats] = useState([]);

  const showStatTrends = (e) => {
    e.preventDefault();
    const latestGameStats = playerStats.lastTenGames.slice(
      playerStats.lastTenGames.length - userInputValue,
      playerStats.lastTenGames.length
    );

    setFormattedTrendStats(formatplayerTrendStats(latestGameStats));
    setShowTrendStats(true);
  };

  const deleteFromList = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem("userCreds")).userId;

    const allPlayersArray = await getSelectedPlayerIds(userId);
    const selectedPlayer = allPlayersArray.filter(
      (player) => player.player_identifier === playerStats.id
    );

    const url = "http://localhost:8080/api/players/selected/delete?";
    axios
      .delete(url + `id=${selectedPlayer["0"].id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="player-card">
      <div className="stats">
        <table className="stats-table">
          <tbody>
            <tr>
              <td>
                <strong>{playerStats.name}</strong>
              </td>
              |
              <td>
                PPG: <strong>{playerStats.avgPts}</strong>
              </td>{" "}
              |
              <td>
                RPG: <strong>{playerStats.avgReb}</strong>
              </td>
              |
              <td>
                APG: <strong>{playerStats.avgAssists}</strong>
              </td>
              |
              <td>
                ASTL: <strong>{playerStats.avgStl}</strong>
              </td>
              |
              <td>
                ABLK: <strong>{playerStats.avgBlocks}</strong>
              </td>
              |
              <td>
                AFGM: <strong>{playerStats.avgFGM}</strong>
              </td>
              |
              <td>
                AFGA: <strong>{playerStats.avgFGA}</strong>
              </td>
              |
              <td>
                ATO: <strong>{playerStats.avgTO}</strong>
              </td>
              |
              <td>
                GP: <strong>{playerStats.gp}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="form-section">
        <form onSubmit={showStatTrends}>
          <label>last x game(s)</label>
          <input
            type="number"
            min="1"
            max="10"
            onChange={(e) => setUserInputValue(e.target.value)}
          />
          <button>View stat trends</button>
        </form>
        <button onClick={(e) => deleteFromList(e)}>
          remove from selected list
        </button>
      </div>
      {showTrendStats && (
        <div className="stats">
          <table className="stats-table">
            <tbody>
              <tr>
                <td>
                  <strong>Last {formattedTrendStats.gp} Games</strong>
                </td>
                |
                <td>
                  PPG: <strong>{formattedTrendStats.avgPts}</strong>
                </td>{" "}
                |
                <td>
                  RPG: <strong>{formattedTrendStats.avgReb}</strong>
                </td>
                |
                <td>
                  APG: <strong>{formattedTrendStats.avgAssists}</strong>
                </td>
                |
                <td>
                  ASTL: <strong>{formattedTrendStats.avgStl}</strong>
                </td>
                |
                <td>
                  ABLK: <strong>{formattedTrendStats.avgBlocks}</strong>
                </td>
                |
                <td>
                  AFGM: <strong>{formattedTrendStats.avgFGM}</strong>
                </td>
                |
                <td>
                  AFGA: <strong>{formattedTrendStats.avgFGA}</strong>
                </td>
                |
                <td>
                  ATO: <strong>{formattedTrendStats.avgTO}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
