import express from "express";
import { Server } from "socket.io";

const app = express();
const server = app.listen(3000);

const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5173",
        methods: ["GET", "POST"]
    }
});

app.get("/", (req, res) => {
    console.log("new req on root");
});


io.on('connection', (socket) => {
    console.log('a user connected ' + socket.id);

    socket.on("SendMessage", (msgInput) => {
        console.log(socket.id + " sent new msg:\n", msgInput);

        io.emit("GetMessage", msgInput, socket.id);
    });

});


