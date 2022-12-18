import mongoose, { Model, Schema, model, Document } from "mongoose";
import { nanoid } from "nanoid";
import { ChatMessage, ChatMessageType } from "./messageModel";
import UserModel from "./UserModel";

interface IRoom extends Document {
    pubid: string,
    owner: typeof mongoose.Types.ObjectId,
    name: string,
    photo: string,
    members: [mongoose.Types.ObjectId],
    messages: [ChatMessageType],
    //virtuals
    publicRoom: {
        pubid: string,
        name: string,
        photo: string
        owner: typeof mongoose.Types.ObjectId,
        members: [mongoose.Types.ObjectId],
        messages: [ChatMessageType],
    }
}

// // Put all Room instance methods in this interface:
// interface IRoomMethods {
//     sendMessage(): typeof messageModel;
// }
// interface IRoomVirtuals {
//     publicRoom(): {
//         pubid: string,
//         name: string,
//         photo: string
//         owner: typeof mongoose.Types.ObjectId,
//         members: [mongoose.Types.ObjectId],
//         messages: [ChatMessage],
//     };
// }

// // Create a new Model type that knows about IRoomMethods...
interface RoomModel extends Model<IRoom> {
    createNew(owner: mongoose.Types.ObjectId, name: string, photo: string): IRoom,
    joinUser(userId: mongoose.Types.ObjectId, roomId: mongoose.Types.ObjectId): IRoom,
    sendMessage(roomID: mongoose.Types.ObjectId, message: ChatMessage): IRoom,
}


// const RoomSchema = new Schema<IRoom, RoomModel, IRoomMethods>({
const RoomSchema = new Schema<IRoom, RoomModel>({
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
    messages: Array<ChatMessageType>,
}, {
    timestamps: true,
    statics:
    {
        async createNew(owner: mongoose.Types.ObjectId, name: string, photo: string) {
            const pubid = nanoid(5);
            const room = await this.create({ pubid, owner, name, photo, members: [owner] });

            const ownerObj = await UserModel.findById(owner); if (!ownerObj) throw Error("User not found")
            UserModel.joinRoom(room._id, ownerObj?._id);

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
    virtuals: {
        publicRoom: {
            get: async function (this: IRoom): Promise<{
                pubid: string;
                name: string;
                photo: string;
                owner: { pubid: string; name: string; photo: string; } | {};
                members: ({ pubid: string; name: string; photo: string; } | undefined)[];
                messages: [ChatMessageType];
            } | undefined> {

                const { pubid,
                    name,
                    photo,
                    messages,
                } = this;

                const owner = await UserModel.findById(this.owner);

                const promisedMembers = this.members.map(async member => {
                    const memberObj = await UserModel.findById(member);
                    return memberObj?.publicUser
                });
                const members = await Promise.all(promisedMembers);

                return {
                    pubid,
                    owner: owner ? owner.publicUser : {},
                    name,
                    photo,
                    members,
                    messages,
                };
            }
        },
    }
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


export default model<IRoom, RoomModel>("Room", RoomSchema, "rooms");