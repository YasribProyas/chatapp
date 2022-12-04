import React from "react";
import RoomMember from "./roomMember";

export default function ChatRoomInfo() {
  return (
    <aside className="chat-room-info">
      <header>
        <img
          className="chat-room-img"
          src="https://robohash.org/Proyas.png?set=set1"
          alt="Chat room photo"
        />
        <h3>Chiki chiki chat</h3>
      </header>
      <section className="chat-room-details">
        <h3>Room id:</h3>

        <br />
        <br />
        <h3>Join Link:</h3>
        <input type="text" name="join-link" id="join-link-txt" />

        <h3>Members</h3>
        <div className="room-members">
          <RoomMember
            name="Chiki Chiki boy"
            img="https://robohash.org/Proyas.png?set=set1"
          />
          <RoomMember
            name="Chiki Chiki boy"
            img="https://robohash.org/Proyas.png?set=set1"
          />
          <RoomMember
            name="Chiki Chiki boy"
            img="https://robohash.org/Proyas.png?set=set1"
          />
          <RoomMember
            name="Chiki Chiki boy"
            img="https://robohash.org/Proyas.png?set=set1"
          />
          <RoomMember
            name="Chiki Chiki boy"
            img="https://robohash.org/Proyas.png?set=set1"
          />
        </div>
      </section>
    </aside>
  );
}
