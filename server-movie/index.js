import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.listen(8080);
const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
io.on("connection", (socket) => {
 
  socket.on("updatedSeats", (updatedSeats) => {
    console.log("Received updated seats from client:", updatedSeats);
    io.emit("newSeatList", updatedSeats);
  });
});

app.post("/ticket/:id", (req, res) => {
  const danhSachGhe = req.body;
  // console.log("🙂 ~ app.post ~ danhSachGhe:", danhSachGhe);
});
