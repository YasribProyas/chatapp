import React, { useRef, useState } from "react";
import PhotoRadio from "../../components/photoRadio";
import { useCreateRoom } from "../../hooks/formHandler";

export default function AddRoom() {
  const [roomId, setRoomId] = useState("");
  const {
    createRoom,
    isLoading: createRoomLoading,
    error: createRoomError,
  } = useCreateRoom();

  const joinRoom = () => {
    console.log(roomId);
  };
  const createRoomSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const roomInfo = createRoom(e);
    roomInfo.then(console.log);
  };
  return (
    <section>
      <h1>Add Room</h1>
      <h3>Join by room id:</h3>
      <input
        onChange={(e) => setRoomId(e.target.value)}
        type="text"
        name="room-id"
        id="room-id"
      />
      <button onClick={joinRoom} disabled={!roomId}>
        Join
      </button>
      <form onSubmit={createRoomSubmit}>
        <h3>Create Room</h3>

        <label>Room photo</label>
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
        <label htmlFor="room-name">Room name</label>
        <input required type="text" name="roomName" id="room-name" />
        <button type="submit">Create Room</button>
      </form>
    </section>
  );
}
