import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    is_guest: {
        type: Boolean,
    },
    rooms: {
        type: Array,
    }
}, { timestamps: true });

export default model("User", UserSchema, "users");


// email
// "abyashrirproyas@gmail.com"
// hash
// "$2b$10$4g8jO38ZDr8t/G8LxYTvpeoP42FVPFwNYFJjAr2MeV4dXXz40bZC2"
// name
// "Proyas"

// rooms
// Array