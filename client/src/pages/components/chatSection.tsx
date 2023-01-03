import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
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

  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    setMessages(selectedRoom?.messages || []);

    // todo if this does not work try taking it outside the scope
    const res = socket?.on(
      "message:receieve",
      ({ message, sent_to }: { message: Message; sent_to: string }) => {
        if (sent_to == selectedRoom?.pubid) {
          setMessages((oldMsg) => [...oldMsg, message]);
          console.log("it should happen");
        }
      }
    );

    // console.log(res?.off());

    return () => {
      res?.off("message:receieve");
    };
  }, [selectedRoom]);

  const onMsgSend = () => {
    // console.log(inputRef.current?.value);

    if (user && inputRef.current?.value) {
      socket?.emit("message:send", {
        message: {
          sent_by: user.pubid,
          text: inputRef.current.value,
          time: new Date(),
        } as Message,
        sent_to: params.roomId,
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
          {messages.map((message, i) => (
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
