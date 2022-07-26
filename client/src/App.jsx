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

  const leave = () => {
    socket.disconnect();
    setJoined(false);
  };

  return (
    <div className="App">
      <JoinPage socket={socket} setJoined={setJoined} />
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
