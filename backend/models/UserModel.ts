import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

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
}, {
    timestamps: true,
    statics:
    {
        async signup(name: string, email: string, password: string, photo: string, is_guest = false) {
            const exists = await this.findOne({ email });
            if (exists) throw Error("User already exists");

            const salt = await bcrypt.genSalt(10);

            const hash = await bcrypt.hash(password, salt as string);

            const user = await this.create({ name, email, hash, photo, is_guest });
            return user;
        },
        async signin(email: string, password: string) {
            const user = await this.findOne({ email });
            if (!user) throw Error("Invalid login credentials");

            const match = await bcrypt.compare(password, user.hash);
            if (!match) throw Error("Invalid login credentials");
            return user;
        }

    }
});



export default model("User", UserSchema, "users");


// email
// "abyashrirproyas@gmail.com"
// hash
// "$2b$10$4g8jO38ZDr8t/G8LxYTvpeoP42FVPFwNYFJjAr2MeV4dXXz40bZC2"
// name
// "Proyas"

// rooms
// Array