import { Request, Response } from "express";
import mongoose from "mongoose";
import UserModel from "../models/UserModel";
import validator from "validator";
import jwt from "jsonwebtoken";


const createToken = (_id: string) => jwt.sign({ _id }, process.env.JWT_SECRET as string, { expiresIn: "3d" });

const getUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: "invalid data" });
    if (!validator.isEmail(email)) return res.status(400).json({ error: "invalid email" });

    try {
        const user = await UserModel.signin(email, password);
        const token = createToken(user._id.toString());
        return res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}

const createUser = async (req: Request, res: Response) => {
    const { name, email, password, photoType, is_guest } = req.body;
    console.log(req.body);


    if (!name || !email || !password || !photoType) return res.status(400).json({ error: "invalid data" });
    if (!validator.isEmail(email)) return res.status(400).json({ error: "invalid email" });

    const photo = "robohash.org/" + name + ".png?set=set" + photoType;

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


export { createUser, getUser, updateUser, deleteGuest };