import "./chat.scss";
import React, { useContext, useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import RoomCard from "./components/roomCard";
import AuthUser from "../models/AuthUser";
import ChatSection from "./components/chatSection";
import ChatRoomInfo from "./components/chatRoomInfo";
import AddRoom from "./components/addRoom";
import { AuthContext } from "../contexts/AuthContext";

interface chatProp {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

export default function Chat() {
  const backendUrl: string = import.meta.env.VITE_BACKEND_URL;

  const [socket, setSocket] = useState<Socket | null>(null);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user || user.error) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    const newSocket = io(backendUrl);
    setSocket(newSocket);
    newSocket.on("connect", () => {
      newSocket.emit("user:identify", {
        token: localStorage.getItem("token"),
        socketId: newSocket.id,
      });
    });
    return () => {
      newSocket.close();
    };
  }, [setSocket]);

  return (
    <main className="chat-app">
      <aside className="chats">
        <header>
          <h2>Chat Room</h2>
          <Link to="addroom">+</Link>
        </header>
        {/* <section className="chat-rooms">
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
        </section> */}
        <section className="chat-rooms">
          {user?.rooms &&
            user.rooms.map((room, i) => (
              <RoomCard
                name={room.name}
                roomID={room.pubid}
                photo={room.photo}
                key={i}
              />
            ))}
        </section>
      </aside>

      <Routes>
        <Route path="/" element={<h1>No rooms</h1>} />
        <Route
          path="/:roomId"
          element={
            <>
              <ChatSection socket={socket} />
              <ChatRoomInfo />
            </>
          }
        />
        <Route path="addroom" element={<AddRoom />} />
      </Routes>
    </main>
  );
}
