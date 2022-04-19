import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketball } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";

const Navbar = () => {
  return (
    <nav>
      <Link className="logo" to="/">
        <FontAwesomeIcon icon={faBasketball} />
      </Link>

      <div className="title">
        <h2>NBA Tracker</h2>
        <span className="title-sub-heading">The latest up to date stats</span>
      </div>

      <div className="nav-buttons">
        <button>Sign in</button>
        <button>Register</button>
      </div>
    </nav>
  );
};

export default Navbar;