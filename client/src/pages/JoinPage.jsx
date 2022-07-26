import { useState } from "react";
import { io } from "socket.io-client";
import { Button, TextField } from "@mui/material";

import RandomPhotoRadio from "../components/RandomPhotoRadio";

const userInfo = {
  name: "",
  imgType: "Random",
  randomImg: "set1",
  url: null,
};
const roomInfo = {
  name: null,
  id: null,
  imgType: "Random",
  randomImg: "set1",
  url: null,
};

export default function JoinPage({ socket, setJoined }) {
  const [userReady, setUserReady] = useState(false);
  const [roomIdReady, setRoomIdReady] = useState(false);
  const [roomCreateReady, setRoomCreateReady] = useState(false);

  const join = () => {
    socket = io(import.meta.env.backend || "localhost:3000");
    socket.connect();
    // socket.emit("joinRoom", params.get("name"), params.get("room"));
    socket.emit("joinRoom", userInfo, roomInfo);
    socket.on("joinedRoom", (room) => {
      console.log(room);
      setJoined(true);
    });
  };

  return (
    <div className="join-page">
      <section className="user-section">
        <h2>User</h2>
        <h4>Username</h4>

        <TextField
          label="Name"
          onChange={(e) => {
            userInfo.name = e.target.value;
            if (userInfo.name.length > 0) {
              setUserReady(true);
            } else {
              setUserReady(false);
            }
          }}
        />

        <RandomPhotoRadio choices={userInfo} />
      </section>
      <section className="join-section">
        <h2>Room</h2>
        <h4>Join</h4>

        <TextField
          label="ID"
          onChange={(e) => {
            roomInfo.id = e.target.value;
            if (roomInfo.id.length > 0) {
              setRoomIdReady(true);
            } else {
              setRoomIdReady(false);
            }
            console.log(userInfo, roomInfo);
          }}
        />

        <Button
          variant="contained"
          size="small"
          onClick={join}
          disabled={!userReady || !roomIdReady}
        >
          Join with id
        </Button>

        <h6>-- or --</h6>
        <h4>Create</h4>
        <TextField
          label="Name"
          onChange={(e) => {
            roomInfo.name = e.target.value;
            if (roomInfo.name.length > 0) {
              setRoomCreateReady(true);
            } else {
              setRoomCreateReady(false);
            }
          }}
        />
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            roomInfo.id = null;
            join();
          }}
          disabled={!userReady || !roomCreateReady}
        >
          Create and join
        </Button>

        <RandomPhotoRadio choices={roomInfo} />
      </section>
      {/* <Fab color="primary" aria-label="Join" className="fab-join">
        <h3>Join</h3>
      </Fab> */}
    </div>
  );
}
