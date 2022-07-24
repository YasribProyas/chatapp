import { useState } from "react";

import "./App.css";
import MessagePage from "./pages/MessagePage";
import { io } from "socket.io-client";

const socket = io("localhost:3000");

export default function App() {
  const params = new URLSearchParams(location.search);
  const [joined, setJoined] = useState(false);

  const join = () => {
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
      {joined ? (
        <button onClick={leave}>leave</button>
      ) : (
        <button onClick={join}>join</button>
      )}
      {joined && <MessagePage socket={socket} />}
    </div>
  );
}
