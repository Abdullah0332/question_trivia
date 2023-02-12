const express = require("express");
const authRouter = require("./user.routes.js");

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);

module.exports = apiRouter;
