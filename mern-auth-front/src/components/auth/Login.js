import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";

export default function Login() {
  // custom useState hooks to set various data
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  // function that submits a post new user data to
  // backend and logins in with that data
  const submit = async (e) => {
    e.preventDefault();
    const loginUser = { email, password };

    const loginRes = await Axios.post(
      "http://localhost:5000/users/login",
      loginUser
    );

    // sets the user and token
    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user,
    });

    // persists the auth token for refresh and new windows in browser
    localStorage.setItem("auth-token", loginRes.data.token);

    // using history call to return to homepage
    history.push("/");
  };

  return (
    <div className="page">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
