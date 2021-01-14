import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function AuthOptions() {
  // geting user data via usecontext with UserContext
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();
  // using the usehistory to switch pages on click via the functions below
  const register = () => {
    history.push("/register");
  };

  const login = () => {
    history.push("/login");
  };
  // logout function to reset token, userdata
  // to undefined and auth token to empty string
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "")
  };
  return (
    <nav className="auth-options">
      {/* return conditional buttons if logged in or not*/}
      {userData.user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>
        </>
      )}
    </nav>
  );
}
