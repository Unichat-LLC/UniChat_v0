// server/server.ts
import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { Server, Socket } from "socket.io";
import { signup, login, logout } from "./controllers/userController.js";
import { requireAuth } from "./middleware/auth.js";
import cookieParser from "cookie-parser";



const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT ?? 4000;

// -------- socket.io -------------------------------------------------
export const io = new Server(server, {
  cors: { origin: "http://localhost:5173" }
});

// Record<string, string> means “userId → socket.id”
export const userSocketMap: Record<string, string> = {};

// connection handler
io.on("connection", (socket: Socket) => {
  // handshake.query is Record<string, unknown>; cast it:
  const { userId } = socket.handshake.query as { userId?: string };
  console.log("User connected:", userId);

  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected:", userId);
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// -------- middleware / routes ---------------------------------------
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: [
      "set-cookie",
      "Content-Type",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Credentials"
    ]
  })
);

app.use(cookieParser());

app.use(express.json());

app.get("/", async (_req: Request, res: Response) => {
  res.send("Hello world");
});


//public routes
app.post("/api/signup", signup);
app.post("/api/login", login);

//protected routes
app.post("/api/logout", requireAuth, logout);


//example protected route
app.get("/api/me", requireAuth, (req: Request, res: Response) => {
  res.json({ user: req.user });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
