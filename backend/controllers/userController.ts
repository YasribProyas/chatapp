import { Request, Response } from "express";
import mongoose from "mongoose";
import UserModel from "../models/UserModel";

const getUser = async (req: Request, res: Response) => {
    const { id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "no such user" });

    const user = await UserModel.findById(id);

    if (!user) return res.status(404).json({ error: "no such user" });
    res.status(200).json(user);

}

const createUser = async (req: Request, res: Response) => {
    const { name, email, password, photoType } = req.body
    const hash = password;
    try {
        const user = await UserModel.create({ name, email, hash, photo: "robohash.org/" + name + ".png?set=set" + photoType });
        res.status(200).json(user);
    } catch {
        res.status(400).json({ error: "can't create user" });
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
    UserModel.findByIdAndDelete(id).catch(() => { throw ("unable to delete user: " + id) });
}
const deleteGuest = async (id: string) => {
    const user = await UserModel.findById(id);
    if (!user) throw ("no such user");
    if (!user.is_guest) throw ("user is not a guest");
}


export { createUser, getUser, updateUser, deleteGuest };