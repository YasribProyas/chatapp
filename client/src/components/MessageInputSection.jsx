import { useState } from "react";

export default function MessageInputSection({ socket }) {
  const [msgInput, setMsgInput] = useState("");

  const onMsgchange = (e) => {
    setMsgInput(e.target.value);
  };
  const onMsgSend = () => {
    if (!msgInput) return;
    socket.emit("SendMessage", msgInput);
    setMsgInput("");
  };

  return (
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
  );
}
