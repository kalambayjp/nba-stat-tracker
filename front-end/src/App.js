import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
