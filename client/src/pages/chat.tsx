import "./chat.scss";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import RoomCard from "./components/roomCard";
import AuthUser from "../models/AuthUser";

interface chatProp {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

export default function Chat() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onMsgSend = () => {
    console.log(inputRef.current?.value);
    if (inputRef.current) inputRef.current.value = "";
  };

  // <Link to="login">Login</Link>
  //     <br />
  //     <Link to="signup">Signup</Link>

  return (
    <main className="chat-app">
      <aside className="chats">
        <header>
          <h2>Chat Room</h2>
          <Link to="addroom">+</Link>
        </header>
        <section className="chat-rooms">
          <RoomCard
            name="chiki chiki chat"
            roomID="chikichikichat"
            photo="https://robohash.org/Proyas.png?set=set1"
          />
          <RoomCard
            name="chiki chiki chat"
            roomID="chikichikichat"
            photo="https://robohash.org/Proyas.png?set=set1"
          />
          <RoomCard
            name="chiki chiki chat"
            roomID="chikichikichat"
            photo="https://robohash.org/Proyas.png?set=set1"
          />
          <RoomCard
            name="chiki chiki chat"
            roomID="chikichikichat"
            photo="https://robohash.org/Proyas.png?set=set1"
          />
          <RoomCard
            name="chiki chiki chat"
            roomID="chikichikichat"
            photo="https://robohash.org/Proyas.png?set=set1"
          />
        </section>
      </aside>

      <section className="chat-area">
        <div className="messages"></div>
        <input
          ref={inputRef}
          onKeyUp={(e) => {
            if (e.key === "Enter") onMsgSend();
          }}
          type="text"
          name="messege-input"
          id="messege-input"
        />
        <button onClick={onMsgSend}>send</button>
      </section>
    </main>
  );
}
