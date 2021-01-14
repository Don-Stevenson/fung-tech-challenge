import React from "react";
import { useHistory } from "react-router-dom";

export default function AuthOptions() {
  const history = useHistory();
 // using the usehistory to switch pages on click via the functions below
  const register = () => {
    history.push("/register");
  };

  const login = () => {
    history.push("/login");
  };
  return (
    <nav className="auth-options">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </nav>
  );
}
