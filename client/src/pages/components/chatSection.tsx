import React, {
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext, authReducer } from "../../contexts/AuthContext";
import MessageCard from "../../components/message";
import { Socket } from "socket.io-client";
import Message from "../../models/Message";
interface IChatSectionProp {
  socket: Socket | null;
}

export default function ChatSection({ socket }: IChatSectionProp) {
  const backendUrl: string = import.meta.env.VITE_BACKEND_URL;
  const msgEndRef = useRef<HTMLDivElement | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const { user, dispatch } = useContext(AuthContext);
  const params = useParams();
  const selectedRoom = user
    ? user.rooms.find((room) => room.pubid == params.roomId)
    : undefined;

  const [messages, setMessages] = useState<Message[]>([]);
  
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user || user.error) {
  //     navigate("/login");
  //   }
  // }, [user]);

  useEffect(() => {
    // if (!selectedRoom) return;
  
    setMessages(selectedRoom?.messages || []);

    fetch(backendUrl + "room/getAll", {
      
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ roomPubid: selectedRoom?.pubid }),
    })
      .then((res) => res.json())
      .then((roomAll) => {
        console.log(roomAll);

        setMessages(roomAll.messages);

        // todo if this does not work try taking it outside the scope
      });
    // fetch(backendUrl + "room/get20", {
    //   method: "POST",
    //   body: JSON.stringify({ roomPubid: selectedRoom?.pubid }),
    // })
    //   .then((res) => res.json())
    //   .then((msgs) => {
    //     console.log(msgs);

    //     setMessages(msgs);

    //     // todo if this does not work try taking it outside the scope
    //   });


    const msgRcvListener = ({
      message,
      sent_to,
    }: {
      message: Message;
      sent_to: string;
    }) => {
      if (sent_to == selectedRoom?.pubid) {
        setMessages((oldMsg) => [...oldMsg, message]);
        // console.log("msg recieved", message);
        msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    };
    const skt = socket?.on("message:receieve", msgRcvListener);

    return () => {
      skt?.off("message:receieve", msgRcvListener);
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
  const joinRoom = () => {
    fetch(backendUrl + "room/join", {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      method: "POST",
      body: JSON.stringify({ roomPubId: params.roomId }),
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <section className="chat-area">
      {selectedRoom ? (
        <>
        <header>
          <h2>{selectedRoom.name}</h2>
        </header>
          <div className="messages">
            {messages.map((message, i) => (
              <MessageCard message={message} room={selectedRoom} key={i} />
            ))}
            <div ref={msgEndRef} className="scroll-landmark"></div>
          </div>

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
        </>
      ) : (
        <>
          <h4>You are not joined in the room</h4>
          <button onClick={joinRoom}>join</button>
        </>
      )}
    </section>
  );
}
