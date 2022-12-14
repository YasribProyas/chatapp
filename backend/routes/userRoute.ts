import express from "express";


import { createUser, loginUser, updateUser, getUser, tokenLogin } from "../controllers/userController";


const UserRouter = express.Router();

UserRouter.post("/getuser", getUser);
UserRouter.post("/signin", loginUser);
UserRouter.post("/tokenlogin", tokenLogin);
UserRouter.post("/signup", createUser);
UserRouter.post("/update", updateUser);

export default UserRouter;