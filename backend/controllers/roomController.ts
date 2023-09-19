import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
// import mongoose from "mongoose";
import RoomModel from "../models/RoomModel";
import UserModel from "../models/UserModel";
import { robohash } from "../utils/photoGen";

export async function getAll(req: Request, res: Response) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', ''); if (!token) throw new Error("no token provided");
        const { roomPubid } = req.body; if (!roomPubid) throw new Error("invalid data");
        // const { _id } = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload; if (!_id) throw new Error("invalid token");

        const room = await RoomModel.findOne({ pubid: roomPubid }); if (!room) throw new Error("Room not found");

        const { pubid,
            name,
            photo,
            messages
        } = room;

        // const members = room.members.map(member=>UserModel.getPublicUser(member as mongoose.Types.ObjectId));

        const membersPromised = room.members.map(async (member) => {
            const memberObj = await UserModel.findById(member);
            return memberObj?.pubid;
        });

        const members = await Promise.all(membersPromised);

        res.status(200).json({
            pubid,
            name,
            photo,
            members,
            messages
        });

    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }

}
export async function getRoom(req: Request, res: Response) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', ''); if (!token) throw new Error("no token provided");
        const { roomPubid } = req.body; if (!roomPubid) throw new Error("invalid data");
        // const { _id } = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload; if (!_id) throw new Error("invalid token");

        const room = await RoomModel.findOne({ pubid: roomPubid }); if (!room) throw new Error("Room not found");

        const { pubid,
            name,
            photo,
            messages
        } = room;

        // const members = room.members.map(member=>UserModel.getPublicUser(member as mongoose.Types.ObjectId));

        const membersPromised = room.members.map(async (member) => {
            const memberObj = await UserModel.findById(member);
            return memberObj?.pubid;
        });

        const members = await Promise.all(membersPromised);

        res.status(200).json({
            pubid,
            name,
            photo,
            members,
            messages
        });

    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }

}
export async function createRoom(req: Request, res: Response) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', ''); if (!token) throw new Error("no token provided");
        const { roomName, photoType } = req.body; if (!roomName || !photoType) throw new Error("invalid data");
        const { _id } = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload; if (!_id) throw new Error("invalid token");

        const room = RoomModel.createNew(_id, roomName, robohash(photoType));

        res.status(200).json(room.publicRoom);

    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }

}
export async function joinRoom(req: Request, res: Response) {
    try {

        const token = req.header('Authorization')?.replace('Bearer ', ''); if (!token) throw new Error("no token provided");
        const { roomPubId } = req.body; if (!roomPubId) throw new Error("invalid data");
        const { _id } = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload; if (!_id) throw new Error("invalid token");
        const roomObj = await RoomModel.findOne({ pubid: roomPubId }); if (!roomObj) throw Error("room not found");
        const user = await UserModel.findByIdAndUpdate(_id, { $push: { rooms: roomObj._id } });
        const room = await RoomModel.joinUser(_id, roomObj._id);
        await RoomModel.sendMessage(room._id, { sent_by: room.pubid, text: user?.name + " joined the chat", time: Date.now() });
        // console.log("request join", room);
        res.status(200).json(room);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}
export async function leaveRoom(req: Request, res: Response) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', ''); if (!token) throw new Error("no token provided");
        const { roomPubId } = req.body; if (!roomPubId) throw new Error("invalid data");
        const { _id } = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload; if (!_id) throw new Error("invalid token");
        const roomObj = await RoomModel.findOne({ pubid: roomPubId }); if (!roomObj) throw Error("room not found");

        await UserModel.findByIdAndUpdate(_id, { $pop: { rooms: roomObj._id } });
        const room = await RoomModel.joinUser(_id, roomObj._id);
        res.status(200).json(room);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}
export async function get20Msg(req: Request, res: Response) {
    try {


        //todo authorize before giving out the messages
        // const token = req.header('Authorization')?.replace('Bearer ', ''); if (!token) throw new Error("no token provided");
        // const { roomPubid } = req.body; if (!roomPubid) throw new Error("invalid data");
        // const { _id } = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload; if (!_id) throw new Error("invalid token");

        const { roomPubid } = req.body; if (!roomPubid) throw new Error("invalid data");

        const room = await RoomModel.findOne({ pubid: roomPubid }); if (!room) throw new Error("invalid data");
        const messages = room.messages.slice(-1, -20);

        res.status(200).json({
            messages
        });

    } catch (error) {

    }
}