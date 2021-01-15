import React from "react";

export default function ErrorNotice(props) {
    // component that displaces the error notice from the backend
  return (
    <div className="error-notice">
      <span>{props.message}</span>
      <button onClick={props.clearError}>X</button>
    </div>
  );
}
