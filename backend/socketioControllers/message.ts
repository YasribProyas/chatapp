import { Socket } from "socket.io";
import { ChatMessageType } from "../models/messageModel";
import RoomModel from "../models/RoomModel";
import { io as sktio } from "../index";

export async function sendMessage(this: Socket, { message, sent_to }: { message: ChatMessageType, sent_to: string }) {
    // console.log("received message ", message)//, this.rooms, sent_to);


    if (this.rooms.has(sent_to)) {
        // console.log("yeah boi");
        // this.to(sent_to).
        const room = await RoomModel.findOne({ pubid: sent_to }); if (!room) throw Error("room " + sent_to + " not found");
        await RoomModel.sendMessage(room?._id, message);
        console.log({ message, sent_to });

        sktio.sockets.in(sent_to).emit("message:receieve", { message, sent_to });
    };
}