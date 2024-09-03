require("dotenv").config();
const mongoose = require("mongoose");
const connectionString = process.env.CONNECTION_STRING;

//mongoose Connection
const connectDB = async () => {
  try {
    await mongoose.connect(connectionString);
    const defaultConnection = mongoose.connection;

    defaultConnection.once("connected", () => {
      console.log("Connected to the Mongodb Server");
    });

    defaultConnection.on("error", (err) => {
      console.log("Mongodb Connection Error is : ", err);
    });

    defaultConnection.on("disconnected", () => {
      console.log("Disconnected from the Mongodb Server");
    });
  } catch (err) {
    console.log("Error occurred during connection", err);
    process.exit(1);
  }
};

module.exports = connectDB;
