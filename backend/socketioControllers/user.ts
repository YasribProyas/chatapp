import { Socket } from "socket.io";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../models/UserModel";
import RoomModel from "../models/RoomModel";

export async function userIdentify(this: Socket, { token, socketId }: { token: string, socketId: string }) {
    console.log("userIdentify", token, socketId);

    if (!token) return Error("Token is undefined")
    
    const verifiedToken = await jwt.verify(token as string, process.env.JWT_SECRET as string);
    const { _id } = verifiedToken as JwtPayload;

    const user = await UserModel.findById(_id)
    if (!user) return Error("Tser not found")
    const promisedRooms = user.rooms.map(async room => {
        const roomObj = await RoomModel.findById(room);
        if (!roomObj) return;
        return roomObj.pubid
    });
    const rooms = await Promise.all(promisedRooms);

    rooms.forEach(room => room ? this.join(room) : null);
}