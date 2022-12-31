import { Socket } from "socket.io";
import { ChatMessageType } from "../models/messageModel";

export function sendMessage(this: Socket, { message, sent_to }: { message: ChatMessageType, sent_to: string }) {
    console.log("received message ", message)//, this.rooms, sent_to);


    if (this.rooms.has(sent_to)) {
        console.log("yeah boi");
        // this.to(sent_to).
        this.emit("message:receieve", { message, sent_to })
    };
}