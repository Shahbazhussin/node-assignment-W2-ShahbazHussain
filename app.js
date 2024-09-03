const express = require("express");
const centralRoutesHandler = require("./routes/index");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", centralRoutesHandler);
module.exports = app;

