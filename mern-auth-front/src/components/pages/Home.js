import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Home() {
  // destructure user data through reducer with UserContext
  const { userData } = useContext(UserContext);
  const history = useHistory();
  // use useFfect to send user to login in no user logged in
  useEffect(() => {
    if (!userData.user) history.push("/login");
  });
  return <div className="page">You've Reached the Homepage Hooray!</div>;
}
