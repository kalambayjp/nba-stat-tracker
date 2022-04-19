import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/index";
import "./index.scss";

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="page">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
