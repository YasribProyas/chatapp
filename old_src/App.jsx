import { useState } from "react";

import "./App.css";

import MessagePage from "./pages/MessagePage";
import JoinPage from "./pages/JoinPage";
import { useRef } from "react";

export default function App() {
  const params = new URLSearchParams(location.search);
  const [joined, setJoined] = useState(false);

  const socket = useRef(null);
  const room = useRef(null);
  const user = useRef(null);

  return (
    <div className="App">
      {joined ? (
        <MessagePage
          socket={socket.current}
          setJoined={setJoined}
          room={room.current}
          user={user.current}
        />
      ) : (
        <JoinPage
          socket={socket}
          setJoined={setJoined}
          room={room}
          user={user}
        />
      )}
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
