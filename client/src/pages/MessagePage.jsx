import { useState, useEffect } from "react";
import Message from "../components/Message";
import MessageInputSection from "../components/MessageInputSection";

export default function MessagePage({ socket, setJoined, room, user }) {
  const [msgList, setMsgList] = useState([]);

  useEffect(() => {
    socket.on("GetMessage", (msg) => {
      setMsgList((current) => [...current, msg]); //{ text, username }
    });
  }, []);

  const leave = () => {
    socket.disconnect();
    setJoined(false);
  };

  return (
    <section className="message-section">
      <h3>Messages:</h3>
      <div className="messages">
        {msgList.map((msg, i) => (
          <Message msg={msg} key={i} />
          // self={msg.id == user.id}
        ))}
      </div>
      <MessageInputSection socket={socket} />
    </section>
  );
}
