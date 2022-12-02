import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
    sent_by: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});



export default model("Message", UserSchema);
