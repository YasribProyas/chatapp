import React from "react";
import { Link } from "react-router-dom";

export default function Chat() {
  return (
    <div>
      <Link to="login">Login</Link>
      <br />
      <Link to="signup">Signup</Link>
    </div>
  );
}
