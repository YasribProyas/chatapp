import express from "express";


import { createUser, loginUser, updateUser } from "../controllers/userController";


const UserRouter = express.Router();

UserRouter.post("/signin", loginUser);
UserRouter.post("/signup", createUser);
UserRouter.post("/update", updateUser);

export default UserRouter;