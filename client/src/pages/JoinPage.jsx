import { TextField } from "@mui/material";

import RandomPhotoRadio from "../components/RandomPhotoRadio";

export default function JoinPage() {
  return (
    <div className="join-page">
      <section className="user-section">
        <h2>User</h2>
        <h4>Username</h4>
        <TextField label="Name" />
        <RandomPhotoRadio />
      </section>
      <section className="join-section">
        <h2>Room</h2>
        <h4>Join</h4>
        <TextField label="ID" />
        <h6>-- or --</h6>
        <h4>Create</h4>
        <TextField label="Name" />
        <RandomPhotoRadio />
      </section>
    </div>
  );
}
