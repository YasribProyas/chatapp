import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../interfaces/UserInterface";
import { useLogin } from "../util/formHandler";

interface loginFormPropInterface {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
export default function LoginForm({ user, setUser }: loginFormPropInterface) {
  const { signin, isLoading, error } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [isLoading]);

  return (
    <form onSubmit={signin}>
      <h1>Login</h1>
      <div className="label-input-grp">
        <label htmlFor="email-input">Email</label>
        <input id="email-input" type="email" required name="email" />
      </div>
      <div className="label-input-grp">
        <label htmlFor="password-input">Password</label>
        <input id="password-input" type="password" required name="password" />
      </div>
      <button type="submit" disabled={isLoading}>
        Login
      </button>
      <br />
      or
      <br />
      <button type="submit" disabled={isLoading}>
        Login as a guest
      </button>
      <p>
        Don't have an account?
        <Link to="/signup">Signup</Link>
      </p>
    </form>
  );
}
