import "./chat.scss";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import RoomCard from "./components/roomCard";
import AuthUser from "../models/AuthUser";
import ChatSection from "./components/chatSection";
import ChatRoomInfo from "./components/chatRoomInfo";
import AddRoom from "./components/addRoom";

interface chatProp {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

export default function Chat() {
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

      <Routes>
        <Route
          path="/"
          element={
            <>
              <ChatSection />
              <ChatRoomInfo />
            </>
          }
        />
        <Route path="addroom" element={<AddRoom />} />
      </Routes>
    </main>
  );
}
