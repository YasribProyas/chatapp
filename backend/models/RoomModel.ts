import mongoose, { Model, Schema, model } from "mongoose";
import { nanoid } from "nanoid";
import { ChatMessage } from "./messageModel";
import UserModel from "./UserModel";

// interface IRoom {
//     pubid: String,
//     owner: typeof mongoose.Types.ObjectId,
//     name: String,
//     photo: String,
//     members: [mongoose.Types.ObjectId],
//     messages: [typeof messageModel],
// }

// // Put all Room instance methods in this interface:
// interface IRoomMethods {
//     sendMessage(): typeof messageModel;
// }

// // Create a new Model type that knows about IRoomMethods...
// type RoomModel = Model<IRoom, {}, IRoomMethods>;


// const RoomSchema = new Schema<IRoom, RoomModel, IRoomMethods>({
const RoomSchema = new Schema({
    pubid: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    members: {
        type: [mongoose.Types.ObjectId],
    },
    messages: {
        type: [{
            sent_by: { type: String },
            text: { type: String },
            timestamps: { type: Number },
        }],
    },
}, {
    timestamps: true,
    statics:
    {
        async createNew(owner: mongoose.Types.ObjectId, name: string, photo: string) {
            const pubid = nanoid(5);
            const room = await this.create({ pubid, owner, name, photo, members: [owner] });

            const ownerObj = await UserModel.findById(owner); if (!ownerObj) throw Error("User not found")
            await UserModel.joinRoom(room._id, ownerObj?._id);

            const msg = new ChatMessage(room.pubid, ownerObj?.name + " created this room");
            await room.updateOne({ $push: { messages: msg } })
            return room;
        },
        async joinUser(userId: mongoose.Types.ObjectId, roomId: mongoose.Types.ObjectId) {
            const room = await this.findByIdAndUpdate(roomId, { $push: { members: userId } });
            return room;
        },
        async sendMessage(roomID: mongoose.Types.ObjectId, message: ChatMessage) {
            return await this.findByIdAndUpdate(roomID, { $push: { messages: message } });
        },
    },
});
// methods: {
//     async sendMessage(message: typeof messageModel) {
//         await this.updateOne({ $push: { messages: message } });
//         return message;
//     },
// },

RoomSchema.method("sendMessage", async function sendMessage(message: ChatMessage) {
    await this.updateOne({ $push: { messages: message } });
    return message;
});



export default model("Room", RoomSchema, "rooms");