import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Header from "./components/layout/Header";

import "./style.css"

export default function App() {
  return (
    <>
      <BrowserRouter>
      <Header/>
        <Switch>
          <Route exact path="/" component={Home} />
        
          <Route exact path="/login" component={Login} />
        
          <Route exact path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
