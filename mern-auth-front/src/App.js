import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Header from "./components/layout/Header";
import UserContext from "./context/UserContext";

import "./style.css";

export default function App() {
  // using usestate to create and set the default userdata
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  // useEffect to run a login check upon site loading
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");

      // handle first time loading website when no token is present
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      // take the above logic and send it to the backend to check if token is valid
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      // if there's a valid token, get the users information from backend and set it to the state
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
            token,
            user: userRes.data
        })
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        {/* using userContext and custom to hook to check and update creditials from backend */}
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
