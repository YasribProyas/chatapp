import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useLogin } from "../hooks/formHandler";

// interface loginFormPropInterface {
//   user: User | null;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
// }
export default function LoginForm() {
  const { signin, isLoading, error, setError } = useLogin();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   if (user && !user.error) {
  //     navigate("/");
  //   }
  // }, [user]);

  return (
    <form onSubmit={signin}>
      <h1>Login</h1>
      <div className="label-input-grp">
        <label htmlFor="email-input">Email</label>
        <input id="email-input" type="email" required name="email" onChange={()=>setError(null)} />
      </div>
      <div className="label-input-grp">
        <label htmlFor="password-input">Password</label>
        <input id="password-input" type="password" required name="password" onChange={()=>setError(null)} />
      </div>
      {error && <p className="error-log">{error.message}</p>}
      <button type="submit" disabled={isLoading}>
        Login
      </button>
      <br />
      or
      <br />
      <button type="submit" disabled={isLoading}>
        Login as a guest
      </button>
    </form>
  );
}
