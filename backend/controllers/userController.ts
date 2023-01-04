import { Request, Response } from "express";
import mongoose, { Mongoose, Schema } from "mongoose";
import UserModel from "../models/UserModel";
import validator from "validator";
import jwt, { JwtPayload } from "jsonwebtoken";
import RoomModel from "../models/RoomModel";


const createToken = (_id: string) => jwt.sign({ _id }, process.env.JWT_SECRET as string, { expiresIn: "3d" });

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: "invalid data" });
    if (!validator.isEmail(email)) return res.status(400).json({ error: "invalid email" });

    try {
        const user = await UserModel.signin(email, password);
        const token = createToken(user._id.toString());
        const { pubid, name, photo, is_guest } = user;

        const roomsPromised = user.rooms.map(async (room: Schema.Types.ObjectId) => {
            const roomObj = await RoomModel.findById(room);
            if (!roomObj) return;
            // todo: Owner and member has to have actual details.
            return roomObj.publicRoom;
        });
        const rooms = await Promise.all(roomsPromised);

        return res.status(200).json({
            email,
            token,
            pubid,
            name,
            photo,
            is_guest,
            rooms,
        });


    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}
const tokenLogin = async (req: Request, res: Response) => {
    const { token } = req.body;

    try {
        const verifiedToken = await jwt.verify(token as string, process.env.JWT_SECRET as string);
        // console.log("🚀 ~ file: userController.ts:40 ~ tokenLogin ~ verifiedToken", verifiedToken);
        const { _id } = verifiedToken as JwtPayload;

        const user = await UserModel.loginWith_id(_id)
        const { pubid, email, name, photo, is_guest } = user;

        /*
        const roomsPromised = user.rooms.map(async (room: string) => {
            const roomObj = await RoomModel.findById(room);
            if (!roomObj) return;
            // todo: Owner and member has to have actual details.
            // make another function for that accessible by all
            const {
                pubid,
                owner,
                name,
                photo,
                members,
                messages,
            } = roomObj
            return {
                pubid,
                owner,
                name,
                photo,
                members,
                messages,
            };
        });
        */

        const roomsPromised = user.rooms.map(async (room: Schema.Types.ObjectId) => {
            const roomObj = await RoomModel.findById(room);
            if (!roomObj) return;
            // todo: Owner and member has to have actual details.
            return roomObj.publicRoom
        });

        const rooms = await Promise.all(roomsPromised);

        // console.log(rooms);
        return res.status(200).json({
            email,
            pubid,
            name,
            photo,
            is_guest,
            rooms,
        });

    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}
const getUser = async (req: Request, res: Response) => {
    const { pubid } = req.body;

    if (!pubid) return res.status(400).json({ error: "invalid data" });

    try {
        const user = await UserModel.getUserWithPubid(pubid);
        const { name, photo } = user;
        return res.status(200).json({
            pubid,
            name,
            photo
        });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}
const createUser = async (req: Request, res: Response) => {
    const { name, email, password, photoType, is_guest } = req.body;
    console.log(req.body);


    if (!name || !email || !password || !photoType) return res.status(400).json({ error: "invalid data" });
    if (!validator.isEmail(email)) return res.status(400).json({ error: "invalid email" });

    const photo = "https://robohash.org/" + name + ".png?set=set" + photoType;

    if (is_guest) {
        // TODO: implement guest login
    }

    try {
        const user = await UserModel.signup(name, email, password, photo, is_guest);
        const token = createToken(user._id.toString());
        return res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}
const updateUser = async (req: Request, res: Response) => {
    const { id } = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "no such user" });
    }
    const user = await UserModel.findByIdAndUpdate(id, ...req.body);

    if (!user) return res.status(400).json({ error: "can't create user" });

    res.status(200).json(user);
}
const deleteUser = (id: string) => {
    UserModel.findByIdAndDelete(id).catch(() => { throw Error("unable to delete user: " + id) });
}
const deleteGuest = async (id: string) => {
    const user = await UserModel.findById(id);
    if (!user) throw Error("no such user");
    if (!user.is_guest) throw Error("user is not a guest");
}


export { createUser, getUser, loginUser, tokenLogin, updateUser, deleteGuest };