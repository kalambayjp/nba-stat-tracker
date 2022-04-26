import axios from "axios";
import { useState } from "react";
import "./index.scss";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../features/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  const login = async (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:8080/api/users?username=${username}&pwd=${pwd}`)
      .then((res) => {
        console.log("worked");
        const userObj = { ...res.data, authenticated: true };
        dispatch(setCurrentUser({ ...userObj }));
        navigate("/profile");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-signin-form">
      <h1>Login</h1>
      <form onSubmit={login}>
        <ul>
          <li>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </li>
          <li>
            <input
              type="password"
              placeholder="Password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
            />
          </li>
          <li>
            <input type="submit" value="login" />
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Login;
