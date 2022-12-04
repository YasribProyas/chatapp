import React, { useRef } from "react";

export default function ChatSection() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onMsgSend = () => {
    console.log(inputRef.current?.value);
    if (inputRef.current) inputRef.current.value = "";
  };
  return (
    <section className="chat-area">
      <header>
        <h2>Chiki chiki chat</h2>
      </header>
      <div className="messages"></div>

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
