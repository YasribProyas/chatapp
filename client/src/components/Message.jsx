export default function Message({ msg }) {
  return (
    <div className="message">
      <div className="name">{msg.username}</div>
      <p className="message-text">{msg.text}</p>
    </div>
  );
}
