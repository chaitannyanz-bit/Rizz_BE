require("dotenv").config();

let express = require("express");
let cors = require("cors");
let http = require("http");
let { Server } = require("socket.io");
let { ObjectId } = require("mongodb");

let { messageCollec, photoCollec } = require("./config/db");
let { upload, cloudinary } = require("./config/cloudinary");

let app = express();
app.use(express.json());
app.use(cors());

let httpServer = http.createServer(app);
let io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.on("message", (data) => {
 
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
  });
});

httpServer.listen(3000, () => console.log("Server is alive at 3000"));