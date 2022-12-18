import React, { useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import MessageCard from "../../components/message";

export default function ChatSection() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { user } = useContext(AuthContext);
  const params = useParams();
  const selectedRoom = user
    ? user.rooms.find((room) => room.pubid == params.roomId)
    : undefined;

  const onMsgSend = () => {
    console.log(inputRef.current?.value);
    if (inputRef.current) inputRef.current.value = "";
  };
  return (
    <section className="chat-area">
      <header>
        <h2>Chiki chiki chat</h2>
      </header>
      {selectedRoom && (
        <div className="messages">
          {selectedRoom.messages.map((message, i) => (
            <MessageCard message={message} key={i} />
          ))}
        </div>
      )}

      <div className="message-input-grp">
        <input
          ref={inputRef}
          onKeyUp={(e) => {
            if (e.key === "Enter") onMsgSend();
          }}
          type="text"
          name="messege-input"
          id="messege-input"
        />
        <button onClick={onMsgSend}>Send</button>
      </div>
    </section>
  );
}
