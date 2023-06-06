const express = require("express");
const userRouter = express.Router();
const { signUp, signIn } = require("../Controller/user");
const { auth } = require("../Middleware/auth");

userRouter.post("/sign-up", signUp);
userRouter.post("/sign-in", signIn);

module.exports = userRouter;
