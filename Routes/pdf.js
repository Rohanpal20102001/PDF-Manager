const express = require("express");
const pdfRouter = express.Router();

const { auth } = require("../Middleware/auth");

module.exports = pdfRouter;
