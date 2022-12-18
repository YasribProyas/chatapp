import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import RoomMember from "./roomMember";

export default function ChatRoomInfo() {
  const { user } = useContext(AuthContext);
  const params = useParams();
  const selectedRoom = user
    ? user.rooms.find((room) => room.pubid == params.roomId)
    : undefined;
  return selectedRoom ? (
    <aside className="chat-room-info">
      <header>
        <img
          className="chat-room-img"
          src={selectedRoom.photo}
          alt="Chat room photo"
        />
        <h3>{selectedRoom.name}</h3>
      </header>
      <section className="chat-room-details">
        <h3>Room id: {selectedRoom.pubid}</h3>

        <br />
        <br />
        <h3>Join Link:</h3>
        <input
          type="text"
          name="join-link"
          id="join-link-txt"
          value={location.href}
          readOnly
          onClick={(e) => {
            const inpF = e.target as HTMLInputElement;
            inpF.select();
          }}
        />

        <h3>Members</h3>
        <div className="room-members">
          {selectedRoom.members.map((member, i) => (
            <RoomMember name={member.name} img={member.photo} key={i} />
          ))}
        </div>
      </section>
    </aside>
  ) : (
    <></>
  );
}
