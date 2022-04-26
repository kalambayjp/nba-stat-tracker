import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import user, { setCurrentUser } from "../../features/user";
import { useState } from "react";
import axios from "axios";
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const dispatch = useDispatch();

  const registerUser = async (e) => {
    e.preventDefault();

    let hashedPwd = bcrypt.hashSync(pwd, process.env.SALT);

    axios
      .post(
        `http://localhost:8080/api/users?firstName=${firstName}&lastName=${lastName}&username=${username}&password=${hashedPwd}`
      )
      .then(() => {
        const userdata = {
          firstName,
          lastName,
          username,
          authenticated: true,
        };
        dispatch(setCurrentUser({ userdata }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-signin-form">
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <ul>
          <li>
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
            />
          </li>
          <li>
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
            />
          </li>
          <li>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </li>
          <li>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
          </li>
          <li>
            <input type="submit" value="submit" name="submit" />
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Register;
