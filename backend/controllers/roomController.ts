import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import RoomModel from "../models/RoomModel";
import UserModel from "../models/UserModel";
import { robohash } from "../utils/photoGen";

export async function createRoom(req: Request, res: Response) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', ''); if (!token) throw new Error("no token provided");
        const { roomName, photoType } = req.body; if (!roomName || !photoType) throw new Error("invalid data");
        const { _id } = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload; if (!_id) throw new Error("invalid token");

        const room = await RoomModel.createNew(_id, roomName, robohash(photoType));

        res.status(200).json(room);

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
        await UserModel.findByIdAndUpdate(_id, { $push: { rooms: roomObj._id } });
        const room = await RoomModel.joinUser(_id, roomObj._id);
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