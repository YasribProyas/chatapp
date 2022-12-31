import React, { useContext, useReducer, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext, authReducer } from "../../contexts/AuthContext";
import MessageCard from "../../components/message";
import { Socket } from "socket.io-client";
import Message from "../../models/Message";
interface IChatSectionProp {
  socket: Socket | null;
}

export default function ChatSection({ socket }: IChatSectionProp) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { user, dispatch } = useContext(AuthContext);
  const params = useParams();
  const selectedRoom = user
    ? user.rooms.find((room) => room.pubid == params.roomId)
    : undefined;

  const onMsgSend = () => {
    console.log(inputRef.current?.value);

    if (user && inputRef.current?.value) {
      socket?.emit("message:send", {
        message: {
          sent_by: user.pubid,
          text: inputRef.current.value,
          time: new Date(),
        } as Message,
        sent_to: params.roomId,
      });

      socket?.on("message:receieve", (message: Message, sent_to: string) => {
        // console.log("yeah boi");
        const targetRooms = user.rooms;
        const targetRoom = targetRooms.find((room) => room.pubid == sent_to);
        if (targetRoom) {
          const messages = [...targetRoom.messages, message];
          //! fix this
          console.log(
            Object.assign(user, {
              rooms: [
                ...targetRooms.filter((room) => room.pubid != sent_to),
                Object.assign(targetRoom, { messages }),
              ],
            })
          );

          dispatch({
            type: "MSG_RCV",
            payload: Object.assign(user, {
              rooms: [
                ...targetRooms.filter((room) => room.pubid != sent_to),
                Object.assign(targetRoom, { messages }),
              ],
            }),
          });
        }
        console.log(user.rooms);
      });
    }
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <section className="chat-area">
      <header>
        <h2>Chiki chiki chat</h2>
      </header>
      {selectedRoom && (
        <div className="messages">
          {selectedRoom.messages.map((message, i) => (
            <MessageCard message={message} room={selectedRoom} key={i} />
          ))}
        </div>
      )}

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
