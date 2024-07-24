import { app } from "./app.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import http from "http";
import connectDB from "./config/db.js";
import { initSocketServer } from "./utils/socketServer.js";

dotenv.config();

const server = http.createServer(app);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

initSocketServer(server);

server.listen(process.env.PORT, () => {
  console.log(`Server is connected to port ${process.env.PORT}`);
  connectDB();
});
