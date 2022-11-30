import { Link } from "react-router-dom";
import { formSubmit } from "../util/formHandler";
import PhotoRadio from "./photoRadio";

export default function SignupForm() {
  const formSubmitCallback = () => {
    console.log("responded");
    // setIsSubmitting(true);
  };
  return (
    <form
      action="signup"
      onSubmit={(e) => {
        formSubmit(e, formSubmitCallback);
      }}
    >
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
          value="robot"
          imgLink="https://via.placeholder.com/50"
          defaultChecked
        />
        <PhotoRadio value="cat" imgLink="https://via.placeholder.com/50" />
        <PhotoRadio value="dog" imgLink="https://via.placeholder.com/50" />
      </div>
      <button type="submit">Next</button>
      <p>
        Already have an account?
        <Link to="/login">Login</Link>
      </p>
    </form>
  );
}
