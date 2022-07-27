import express from "express";
import { Server } from "socket.io";

const app = express();
const server = app.listen(process.env.port || 3000);

const rooms = new Map();
const users = new Map();

const io = new Server(server, {
    cors: {
        origin: process.env.client || "http://127.0.0.1:5173"
    }
});

io.on('connection', (socket) => {
    console.log('a user connected ' + socket.id);

    socket.on("joinRoom", (userInfo, roomInfo) => {

        console.log(userInfo, "\n", roomInfo);

        const user = new User(socket.id, userInfo.name, userInfo.url, roomInfo.id);

        users.set(user.id, user);

        if (!roomInfo.id) {
            if (!roomInfo.name) { socket.emit("joinFailed"); return; }

            roomInfo.id = roomInfo.name.trim().replace(" ", "") + Math.floor(Math.random() * 100000);
            rooms.set(roomInfo.id, new Room(roomInfo.id, roomInfo.name, roomInfo.img));
        }

        if (!rooms.has(roomInfo.id)) { socket.emit("joinFailed"); return; }

        user.roomId = roomInfo.id;
        rooms.get(roomInfo.id).users.set(user.id, user);
        socket.join(roomInfo.id);

        socket.emit("joinedRoom", rooms.get(roomInfo.id), user);
        io.to(roomInfo.id).emit("GetMessage", new Message(user, user.username + " joined"));

        console.log(user.id + " joined " + user.roomId);

    });



    socket.on("SendMessage", (msgInput) => {
        const user = users.get(socket.id);
        if (!user) return;

        const msg = new Message(user, msgInput)
        io.to(user.roomId).emit("GetMessage", msg);
    });

    socket.on("disconnect", (reason) => {
        console.log(socket.id + " disconnected");
        const user = users.get(socket.id);
        if (!user) return;

        rooms.get(users.get(socket.id).roomId).users.delete(socket.id);
        users.delete(socket.id);

        io.to(user.roomId).emit("GetMessage", user.username + " left", null);
    });

});




class Room {
    constructor(id, name, img) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.users = new Map;
        this.messages = [];
    }
}
class User {
    constructor(id, username, img, roomId) {
        this.id = id;
        this.username = username;
        this.roomId = roomId;
        this.img = img;
    }
}

class Message {
    constructor(user, text) {
        this.username = user.username;
        this.id = user.id;
        this.photo = user.img;
        this.text = text;
    }
}

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