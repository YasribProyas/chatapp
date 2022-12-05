
import express, { Router } from 'express';
import { createRoom, joinRoom, leaveRoom } from '../controllers/roomController';

const RoomRouter = express.Router();

RoomRouter.post("/create", createRoom);
RoomRouter.post("/join", joinRoom);
RoomRouter.post("/leave", leaveRoom);

export default RoomRouter;