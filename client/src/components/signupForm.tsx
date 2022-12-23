import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useSignup } from "../hooks/formHandler";
import PhotoRadio from "./photoRadio";

// interface signupFormPropInterface {
//   user: User | null;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
// }

export default function SignupForm() {
  const { signup, isLoading, error } = useSignup();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && !user.error) {
      navigate("/chat");
    }
  }, [user]);

  return (
    <form onSubmit={signup}>
      <h1>Signup</h1>
      <div className="label-input-grp">
        <label htmlFor="name-input">Name</label>
        <input id="name-input" type="text" required name="name" />
      </div>
      <div className="label-input-grp">
        <label htmlFor="email-input">Email</label>
        <input id="email-input" type="email" required name="email" />
      </div>
      <div className="label-input-grp">
        <label htmlFor="password-input">Password</label>
        <input id="password-input" type="password" required name="password" />
      </div>
      <br />
      <label>Photo</label>
      <div className="radio-group">
        <PhotoRadio
          label="robot"
          value="1"
          imgLink="https://robohash.org/Proyas.png?set=set1"
          defaultChecked
        />
        <PhotoRadio
          label="cat"
          value="4"
          imgLink="https://robohash.org/Proyas.png?set=set4"
        />
        <PhotoRadio
          label="human"
          value="5"
          imgLink="https://robohash.org/Proyas.png?set=set5"
        />
      </div>
      <br />
      <button type="submit" disabled={isLoading}>
        Next
      </button>
      <p>
        Already have an account?
        <Link to="/login">Login</Link>
      </p>
    </form>
  );
}
