import { useState, useEffect } from "react";
import Message from "../components/Message";
import MessageInputSection from "../components/MessageInputSection";

export default function MessagePage({ socket }) {
  const [msgList, setMsgList] = useState([]);

  useEffect(() => {
    socket.on("GetMessage", (text, username) => {
      setMsgList((current) => [...current, { text, username }]); //{ text, username }
    });
  }, []);

  return (
    <section className="message-section">
      <h3>Messages:</h3>
      <div className="messagees">
        {msgList.map((msg, i) => (
          <Message msg={msg} key={i} />
        ))}
      </div>
      <MessageInputSection socket={socket} />
    </section>
  );
}
