import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from './components/pages/Home'

export default function App() {
  return <>
  <BrowserRouter>
  <Switch>
    <Route path="/" component={Home}>

    </Route>
  </Switch>
  </BrowserRouter>
  </>

}
