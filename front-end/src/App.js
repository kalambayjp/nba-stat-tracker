import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./components/Landing";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
