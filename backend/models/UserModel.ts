import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

const UserSchema = new Schema({
    pubid: {
        type: String,
        required: true
    },
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
    statics: {
        async signup(name: string, email: string, password: string, photo: string, is_guest = false) {
            const exists = await this.findOne({ email });
            if (exists) throw Error("User already exists");

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt as string);
            const pubid = nanoid(5);

            const user = await this.create({ pubid, name, email, hash, photo, is_guest });
            return user;
        },
        async signin(email: string, password: string) {
            const user = await this.findOne({ email });
            if (!user) throw Error("Invalid login credentials");

            const match = await bcrypt.compare(password, user.hash);
            if (!match) throw Error("Invalid login credentials");
            return user;
        },
        async getUserWithPubid(pubid: string) {
            const user = await this.findOne({ pubid });
            if (!user) throw Error("Invalid id");
            return user;
        }
    },
});



export default model("User", UserSchema, "users");
