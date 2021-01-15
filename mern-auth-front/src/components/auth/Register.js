import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ErrorNotice from "../misc/ErrorNotice"
import Axios from "axios";

export default function Register() {
  // custom useState hooks to set various data
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  // function that submits a post new user data to
  // backend and logins in with that data
  const submit = async (e) => {
    // prevents a page refresh on submit
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, displayName };
      await Axios.post("http://localhost:5000/users/register", newUser);
      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });

      // sets the user and token
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      // persists the auth token for refresh and new windows
      localStorage.setItem("auth-token", loginRes.data.token);

      // using history call to return to homepage
      history.push("/");
    } catch (error) {
      // catch the error and set it to state if present
      error.response.data.msg && setError(error.response.data.msg);
    }
  };

  // form for registration
  return (
    <div className="page">
      <h2>Register</h2>

      {/* display an error message and click it clear it */}
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="verify your password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <label htmlFor="register-display-name">Display Name</label>
        <input
          id="register-display-name"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
