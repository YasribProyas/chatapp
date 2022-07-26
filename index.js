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

    socket.on("joinRoom", (username, roomId) => {
        const user = new User(socket.id, username, roomId);

        users.set(user.id, user);

        if (!rooms.has(roomId)) {
            rooms.set(roomId, new Room(roomId, "yoyo"));
        }
        rooms.get(roomId).users.set(user.id, user);
        socket.join(roomId);

        io.to(roomId).emit("GetMessage", user.username + " joined", null);

        console.log(user.id + " joined " + user.roomId);
    })


    socket.on("SendMessage", (msgInput) => {
        const user = users.get(socket.id);
        if (!user) return;

        io.to(user.roomId).emit("GetMessage", msgInput, user.username);
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
    constructor(id, name) {
        this.id = id; this.name = name;
    }
    users = new Map;
}
class User {
    constructor(id, username, roomId) {
        this.id = id;
        this.username = username;
        this.roomId = roomId;
    }

}
