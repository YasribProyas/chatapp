import { Avatar } from "@mui/material";

export default function Message({ msg }) {
  return (
    <div className="message">
      <Avatar src={msg.photo} alt={"dp of " + msg.username} />
      <div className="message-text-area">
        <div className="name">{msg.username}</div>
        <p className="message-text">{msg.text}</p>
      </div>
    </div>
  );
}
