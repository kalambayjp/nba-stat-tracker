import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketball } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../features/user";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./index.scss";

const Navbar = () => {
  const username = useSelector((state) => state.user.value.username);
  // useEffect(() => {}, []);

  const dispatch = useDispatch();

  const logout = () => {
    localStorage.clear();
    dispatch(
      setCurrentUser({
        firstName: "",
        lastName: "",
        username: "",
        authenticated: false,
      })
    );
    Navigate("/");
  };
  return (
    <nav>
      <Link className="logo" to="/">
        <FontAwesomeIcon icon={faBasketball} />
      </Link>

      <div className="title">
        <h2>NBA Tracker</h2>
        <span className="title-sub-heading">The latest up to date stats</span>
      </div>

      {username ? (
        <div className="nav-buttons">
          <span className="username">{username}</span>
          <button onClick={() => logout()}>Logout</button>
        </div>
      ) : (
        <div className="nav-buttons">
          <Link to="/login">
            <button>Sign in</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
