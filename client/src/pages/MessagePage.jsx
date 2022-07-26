import { useState, useEffect } from "react";
import Message from "../components/Message";
import MessageInputSection from "../components/MessageInputSection";

export default function MessagePage({ socket }) {
  const [msgList, setMsgList] = useState([
    {
      username: "username",
      id: "gasgagsgasgasgsdsd",
      photo: "https://robohash.org/proyas?size=100x100",
      text: "text",
    },
    {
      username: "username",
      id: "gasgagsgasgasgsdsd",
      photo: "https://robohash.org/proyas?size=100x100",
      text: "text",
    },
    {
      username: "username",
      id: "memememememe",
      photo: "https://robohash.org/proyas?size=100x100",
      text: "text",
    },
    {
      username: "username",
      id: "gasgagsgasgasgsdsd",
      photo: "https://robohash.org/proyas?size=100x100",
      text: "text",
    },
    {
      username: "username",
      id: "gasgagsgasgasgsdsd",
      photo: "https://robohash.org/proyas?size=100x100",
      text: "text",
    },
  ]);

  // useEffect(() => {
  //   socket.on("GetMessage", (text, username) => {
  //     setMsgList((current) => [...current, { text, username }]); //{ text, username }
  //   });
  // }, []);

  return (
    <section className="message-section">
      <h3>Messages:</h3>
      <div className="messages">
        {msgList.map((msg, i) => (
          <Message msg={msg} key={i} />
        ))}
      </div>
      <MessageInputSection socket={socket} />
    </section>
  );
}
