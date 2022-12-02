import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { User } from "../interfaces/UserInterface";

interface chatProp {
  user: User | null;
}

export default function Chat({ user }: chatProp) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onMsgSend = () => {
    console.log(inputRef.current?.value);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <Link to="login">Login</Link>
      <br />
      <Link to="signup">Signup</Link>

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
    </div>
  );
}
