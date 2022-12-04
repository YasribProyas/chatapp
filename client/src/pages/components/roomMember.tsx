interface IRoomMemberProp {
  name: string;
  img: string;
}

export default function RoomMember({ name, img }: IRoomMemberProp) {
  return (
    <div className="room-member">
      <img className="room-member-img" src={img} alt="Chat room photo" />
      <h5 className="room-member-name">{name}</h5>
    </div>
  );
}
