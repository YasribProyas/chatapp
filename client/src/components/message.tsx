import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "./message.scss";
import Message from "../models/Message";
import { multiClass } from "../util/multiClass";
import Room from "../models/Room";
interface IMessageProps {
  message: Message;
  room: Room;
}

export default function MessageCard({ message, room }: IMessageProps) {
  const { user } = useContext(AuthContext);
  const params = useParams();

  let msg_sender = "";
  switch (message.sent_by) {
    case room?.pubid:
      msg_sender = "room";
      break;
    case user?.pubid:
      msg_sender = "self";
      break;
    default:
      msg_sender = "other";
      break;
  }

  return (
    <div className={multiClass("message", msg_sender)}>
      <h6 className="msg-sender">{message.sent_by}</h6>
      <p className="msg-txt">{message.text}</p>
    </div>
  );
}
