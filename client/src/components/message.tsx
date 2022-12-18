import React from "react";
import Message from "../models/Message";
interface IMessageProps {
  message: Message;
}

export default function MessageCard({ message }: IMessageProps) {
  return (
    <div className="message">
      <h6>{message.sent_by}</h6>
      <p>{message.text}</p>
    </div>
  );
}
