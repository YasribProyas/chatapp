import mongoose, { Schema, model, Model, Document } from "mongoose";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

// type Room = Array<mongoose.Types.ObjectId>;
interface IUser extends Document {
    pubid: string,
    name: string,
    email: string,
    hash: string,
    photo: string,
    is_guest: boolean,
    rooms: Schema.Types.ObjectId[],
    //Virtuals
    publicUser: {
        pubid: string,
        name: string,
        photo: string
    }
}
// interface IUserMethods {
// }


interface UserModel extends Model<IUser> {
    signup(name: string, email: string, password: string, photo: string, is_guest: boolean): IUser,
    signin(email: string, password: string): IUser,
    loginWith_id(dbId: string): IUser,
    getUserWithPubid(pubid: string): IUser,
    joinRoom(roomId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId): IUser,
}

const UserSchema = new Schema<IUser, UserModel>({
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
    rooms: Array<Schema.Types.ObjectId>
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
        async loginWith_id(dbId: string) {
            const user = await this.findById(dbId);
            if (!user) throw Error("Invalid _id");
            return user;
        },
        async getUserWithPubid(pubid: string) {
            const user = await this.findOne({ pubid });
            if (!user) throw Error("Invalid id");
            return user;
        },
        async joinRoom(roomId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) {
            const user = await this.findByIdAndUpdate(userId, { $push: { rooms: roomId } });
            return user;
        },
    },
    virtuals: {
        publicUser: {
            get: function (this: IUser): {
                pubid: string,
                name: string,
                photo: string
            } {
                const { pubid, name, photo } = this;
                return {
                    pubid,
                    name,
                    photo
                };
            }
        },
    }

});


export default model<IUser, UserModel>("User", UserSchema, "users");

// const { pubid, name, photo } = this;
//             return {
//                 pubid,
//                 name,
//                 photo
//             };

