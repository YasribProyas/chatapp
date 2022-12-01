import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formSubmit } from "../util/formHandler";

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formSubmitCallback = () => {
    console.log("responded");
    // setIsSubmitting(true);
  };
  return (
    <form
      action="login"
      onSubmit={function (e) {
        formSubmit(e, formSubmitCallback);
      }}
    >
      <h1>Login</h1>
      <div className="label-input-grp">
        <label htmlFor="email-input">Email</label>
        <input id="email-input" type="email" required name="email" />
      </div>
      <div className="label-input-grp">
        <label htmlFor="password-input">Password</label>
        <input id="password-input" type="password" required name="password" />
      </div>
      <button type="submit" disabled={isSubmitting}>
        Login
      </button>
      <br />
      or
      <br />
      <button type="submit" disabled={isSubmitting}>
        Login as a guest
      </button>
      <p>
        Don't have an account?
        <Link to="/signup">Signup</Link>
      </p>
    </form>
  );
}
