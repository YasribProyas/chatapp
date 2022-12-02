import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import messageModel from "./messageModel";
import UserModel from "./UserModel";
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
        type: Array,
    },
}, {
    timestamps: true,
    statics:
    {
        async createNew(owner: mongoose.Types.ObjectId, name: string, photo: string) {
            const pubid = nanoid(5);
            const room = await this.create({ pubid, owner, name, photo, members: [owner] });
            const ownerName = UserModel.findById(owner);
            // await this.findById(room._id).sendMessage(messageModel.create({sent_by:pubid, text:ownerName+" created this room"}));
            return room;
        },
        async joinUser(userId: mongoose.Types.ObjectId, roomId: mongoose.Types.ObjectId) {
            const room = this.findByIdAndUpdate(roomId, { $push: { members: userId } });
            return room;
        },

    },
    methods: {
        async sendMessage(message: typeof messageModel) {
            await this.updateOne({ $push: { messages: message } });
            return message;
        },

    }
});



export default model("Room", RoomSchema, "rooms");