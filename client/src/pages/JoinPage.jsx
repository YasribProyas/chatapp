import { useState } from "react";
import { Button, TextField } from "@mui/material";

import RandomPhotoRadio from "../components/RandomPhotoRadio";

export default function JoinPage({ socket, setJoined }) {
  const [userReady, setUserReady] = useState(false);
  const [roomIdReady, setRoomIdReady] = useState(false);
  const [roomCreateReady, setRoomCreateReady] = useState(false);

  const userInfo = {
    name: null,
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

  const join = () => {
    socket = io(process.env.backend || "localhost:3000");
    socket.connect();
    // socket.emit("joinRoom", params.get("name"), params.get("room"));
    socket.emit("joinRoom", userInfo, roomInfo);
    setJoined(true);
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
            if (userInfo.length > 0) {
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
            if (roomInfo.id > 0) {
              setRoomIdReady(true);
            } else {
              setRoomIdReady(false);
            }
          }}
        />
        <Button onClick={join} disabled={!userReady && !roomIdReady}>
          Join with id
        </Button>
        <h6>-- or --</h6>
        <h4>Create</h4>
        <TextField
          label="Name"
          onChange={(e) => {
            roomInfo.name = e.target.value;
            if (roomInfo.name > 0) {
              setRoomCreateReady(true);
            } else {
              setRoomCreateReady(false);
            }
          }}
        />
        <Button
          onClick={() => {
            roomInfo.id = null;
            join();
          }}
          disabled={!userReady && !roomCreateReady}
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
