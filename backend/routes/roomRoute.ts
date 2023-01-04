
import express, { Router } from 'express';
import { createRoom, joinRoom, leaveRoom, get20Msg } from '../controllers/roomController';

const RoomRouter = express.Router();

RoomRouter.post("/create", createRoom);
RoomRouter.post("/join", joinRoom);
RoomRouter.post("/leave", leaveRoom);
RoomRouter.post("/get20", get20Msg);

export default RoomRouter;