import { useState } from "react";
import axios from "axios";
import SearchPlayerCard from "./SearchPlayerCard";

const PlayerSearch = () => {
  const [playerSearch, setPlayerSearch] = useState("");
  const [playerSearchResults, setPlayerSearchResults] = useState([]);

  // build displayed search results
  const displayedSearchResults = playerSearchResults.map((player, i) => {
    return <SearchPlayerCard key={player.firstname + i} player={player} />;
  });

  const searchForPlayers = async (e) => {
    try {
      e.preventDefault();
      const url = "http://localhost:8080/api/players/name?lastName=";
      axios
        .get(url + playerSearch)
        .then((res) => setPlayerSearchResults(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="player-search">
      <form onSubmit={searchForPlayers}>
        <h1>Add players to your list</h1>
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
      {playerSearchResults.length > 0 && displayedSearchResults}
    </div>
  );
};

export default PlayerSearch;
