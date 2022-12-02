import express from "express";


import { createUser, getUser, updateUser } from "../controllers/userController";


const UserRouter = express.Router();

UserRouter.post("/signin", getUser);
UserRouter.post("/signup", createUser);
UserRouter.post("/update", updateUser);

export default UserRouter;