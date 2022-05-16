import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import PlayerSearch from "./components/PlayerSearch/PlayerSearch";
import TeamSearch from "./components/TeamSearch/TeamSearch";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/player-search" element={<PlayerSearch />} />
            <Route exact path="/team-search" element={<TeamSearch />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
