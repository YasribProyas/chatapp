import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Room from "../models/Room";

const backendUrl: string = import.meta.env.VITE_BACKEND_URL;

interface IRoomContextProviderProp {
  children: React.ReactNode;
}

const { user } = useContext(AuthContext);

export const RoomContext = createContext<Room[] | null>(null);

let [rooms, setRooms] = useState<Room[]>([]);

export const RoomsContextProvider = ({
  children,
}: IRoomContextProviderProp) => {
  if (!user) return;
  useEffect(() => {
    const localUserToken = localStorage.getItem("token");
    if (localUserToken) {
      fetch(backendUrl + "room/getAll", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(user.rooms),
      })
        .then((res) => res.json())
        .then(setRooms)
        .catch(() => {
          return;
          localStorage.removeItem("token");
        });
    }
  }, [user]);

  console.log("D rooms: ", rooms);

  return <RoomContext.Provider value={rooms}>{children}</RoomContext.Provider>;
};
