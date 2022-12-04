import { Link } from "react-router-dom";

interface IRoomCard {
  name: string;
  photo: string;
  roomID: string;
}

export default function RoomCard({ name, photo, roomID }: IRoomCard) {
  return (
    <Link to={"/chat/" + roomID}>
      <div className="chat-room">
        <img src={photo} alt={name + " group img"} />
        <h4 className="chat-room-name">{name}</h4>
      </div>
    </Link>
  );
}
