
import express, { Router } from 'express';
import { createRoom, joinRoom, leaveRoom, get20Msg, getAll } from '../controllers/roomController';

const RoomRouter = express.Router();

RoomRouter.post("/create", createRoom);
RoomRouter.post("/join", joinRoom);
RoomRouter.post("/leave", leaveRoom);
RoomRouter.post("/get20", get20Msg);
RoomRouter.post("/getAll", getAll);

export default RoomRouter;