// server/server.ts
import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { Server, Socket } from "socket.io";
import { signup, login, logout, updateProfile } from "./controllers/userController.js";
import { requireAuth } from "./middleware/auth.js";
import cookieParser from "cookie-parser";
import { requireGroup } from "./middleware/utils.js";
import { getGroupMembers, getMessages, getUserMessages, sendMessage } from "./controllers/messageController.js";
import { createGroup, leaveGroup, getGroups } from "./controllers/groupController.js";
import { GroupModel } from "./models/Group.js";


// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT ?? 4000;

// -------- socket.io -------------------------------------------------
// Initialize Socket.IO server with CORS settings
export const io = new Server(server, {
  cors: { origin: "http://localhost:5173" }
});

// Map to keep track of online users: userId -> socket.id
export const userSocketMap: Record<string, string> = {};

// Handle new socket connections
io.on("connection", async(socket: Socket) => {
  // Extract userId from handshake query
  const { userId } = socket.handshake.query as { userId?: string };
  console.log("User connected:", userId);

  // Disconnect if no userId is provided
  if (!userId) {
    socket.disconnect();
    return;
  }

  // Save socket.id for the connected user
  userSocketMap[userId] = socket.id;

  // Join all groups the user belongs to
  const groups = await GroupModel.getGroupsForUser(Number(userId));
  groups.forEach(group => {
      socket.join(`group-${group.id}`);
  });

  // Notify all clients about the current online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle user disconnect
  socket.on("disconnect", () => {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// -------- middleware / routes ---------------------------------------
// Enable CORS for frontend origin and allow credentials
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

// Parse cookies from incoming requests
app.use(cookieParser());

// Parse JSON bodies
app.use(express.json());

// Root route for health check or welcome message
app.get("/", async (_req: Request, res: Response) => {
  res.send("Hello world");
});


//public routes
app.post("/api/signup", signup);
app.post("/api/login", login);

//protected routes (authentication required)
app.post("/api/logout", requireAuth, logout);
app.get(
  "/api/profile",
  requireAuth,
  (req: Request, res: Response) => {
    res.json({user: req.user});
  }
);
app.patch("/api/profile", requireAuth, updateProfile);


//group related routes
app.get("/api/groups/:groupId/members", requireAuth, requireGroup, getGroupMembers);
app.post("/api/groups", requireAuth, createGroup);
app.get("/api/groups", requireAuth, getGroups);
app.delete("/api/groups/:groupId/leave", requireAuth, requireGroup, leaveGroup);

//message related routes
app.post("/api/groups/:groupId/messages", requireAuth, requireGroup, sendMessage);
app.get("/api/groups/:groupId/messages", requireAuth, requireGroup, getMessages);
app.get("/api/my/messages", requireAuth, getUserMessages);


// Start the server and listen on the specified port
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
