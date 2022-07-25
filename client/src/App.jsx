import { useState } from "react";
import { io } from "socket.io-client";

import { Button, Fab, Paper } from "@mui/material";
import "./App.css";

import MessagePage from "./pages/MessagePage";
import JoinPage from "./pages/JoinPage";
import RandomPhotoRadio from "./components/RandomPhotoRadio";

let socket;

export default function App() {
  const params = new URLSearchParams(location.search);
  const [joined, setJoined] = useState(false);

  const join = () => {
    socket = io("localhost:3000");
    socket.connect();
    socket.emit("joinRoom", params.get("name"), params.get("room"));
    setJoined(true);
  };
  const leave = () => {
    socket.disconnect();
    setJoined(false);
  };

  return (
    <div className="App">
      <JoinPage />
      <Fab color="primary" aria-label="Join" className="fab-join" disabled>
        <h3>Join</h3>
      </Fab>
    </div>
  );
}

// {joined ? (
//   <Button variant="outlined" onClick={leave}>
//     leave
//   </Button>
// ) : (
//   <Button variant="contained" onClick={join}>
//     join
//   </Button>
// )}
// {joined && <MessagePage socket={socket} />}
