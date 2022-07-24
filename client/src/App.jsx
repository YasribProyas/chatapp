import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import "./App.css";

const socket = io("localhost:3000");

export default function App() {
  const [msgInput, setMsgInput] = useState("");
  const [msgList, setMsgList] = useState([]);
  const list = [];
  const params = new URLSearchParams(location.search);

  useEffect(() => {
    socket.on("GetMessage", (msg, id) => {
      list.push({ text: msg, id });
      setMsgList([...list]); //{ text: msg, id }
    });
  }, []);

  // useEffect(()=>{

  // }, [msgList])

  const onMsgSend = () => {
    if (!msgInput) return;
    console.log("sending ", msgInput);
    socket.emit("SendMessage", msgInput);
    setMsgInput("");
  };

  const onMsgchange = (e) => {
    setMsgInput(e.target.value);
  };

  return (
    <div className="App">
      <section className="message-section">
        <h3>Messages:{socket.id}</h3>
        <div className="messagees">
          {msgList.map((msg, i) => (
            <div className="message" key={i}>
              <div className="name">{msg.id}</div>
              <p className="message-text">{msg.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="message-input-section">
        <input
          type="text"
          className="message-input-field"
          value={msgInput}
          onChange={onMsgchange}
        />
        <button className="message-input-button" onClick={onMsgSend}>
          send
        </button>
      </section>
    </div>
  );
}
