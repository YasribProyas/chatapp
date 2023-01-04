import express, { json } from "express";
import { Server } from "socket.io";
import cors from "cors";
import moragan from "morgan";
import dotenv from "dotenv"; dotenv.config();
import mongoose from "mongoose";

import UserRouter from "./routes/userRoute";
import RoomRouter from "./routes/roomRoute";
import { sendMessage } from "./socketioControllers/message";
import { userIdentify } from "./socketioControllers/user";



const app = express();
app.use(cors());
app.use(json());
app.use(moragan(":method :url"));

// routes
app.use("/user", UserRouter);
app.use("/room", RoomRouter);

mongoose.connect(process.env.MONGODB_URI as string).then(val => {
  console.log("connected to mongoDB");
});

app.get("/", async (req, res) => {
  res.send("root");
});

const server = app.listen(process.env.PORT, () => {
  console.log("listening");
});

export const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on('connection', (socket) => {
  console.log('a user connected ' + socket.id);


  socket.on("message:send", sendMessage);
  socket.on("user:identify", userIdentify);


  // socket.on("joinRoom", (userPubId, roomPubId) => {

  //     // console.log(userInfo, "\n", roomInfo);

  //     const user = new User(socket.id, userInfo.name, userInfo.url, roomInfo.id);

  //     users.set(user.id, user);

  //     if (!roomInfo.id) {
  //         if (!roomInfo.name) { socket.emit("joinFailed"); return; }

  //         roomInfo.id = roomInfo.name.trim().replace(" ", "") + Math.floor(Math.random() * 100000);
  //         rooms.set(roomInfo.id, new Room(roomInfo.id, roomInfo.name, roomInfo.img));
  //     }

  //     if (!rooms.has(roomInfo.id)) { socket.emit("joinFailed"); return; }

  //     user.roomId = roomInfo.id;
  //     rooms.get(roomInfo.id).users.set(user.id, user);
  //     socket.join(roomInfo.id);

  //     socket.emit("joinedRoom", rooms.get(roomInfo.id), user);
  //     io.to(roomInfo.id).emit("GetMessage", new Message(user, user.username + " joined"));

  //     console.log(user.id + " joined " + user.roomId);

  // });



  // socket.on("SendMessage", (msgInput) => {
  //     const user = users.get(socket.id);
  //     if (!user) return;

  //     const msg = new Message(user, msgInput)
  //     io.to(user.roomId).emit("GetMessage", msg);
  // });

  socket.on("disconnect", (reason) => {
    console.log(socket.id + " disconnected");
    // const user = users.get(socket.id);
    // if (!user) return;

    // rooms.get(users.get(socket.id).roomId).users.delete(socket.id);
    // users.delete(socket.id);

    // io.to(user.roomId).emit("GetMessage", user.username + " left", null);
  });

});


// class Room {
//     constructor(id, name, img) {
//         this.id = id;
//         this.name = name;
//         this.img = img;
//         this.users = new Map;
//         this.messages = [];
//     }
// }
// class User {
//     constructor(id, username, img, roomId) {
//         this.id = id;
//         this.username = username;
//         this.roomId = roomId;
//         this.img = img;
//     }
// }

// class Message {
//     constructor(user, text) {
//         this.id = user.id;
//         this.username = user.username;
//         this.photo = user.img;
//         this.text = text;
//     }
// }

/*
const userInfo = {
  name: "",
  imgType: "Random",
  randomImg: "set1",
  url: null,
};
const roomInfo = {
  name: null,
  id: null,
  imgType: "Random",
  randomImg: "set1",
  url: null,
};
*/

