import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express(); // http handler and routes; core structure of app
const server = http.createServer(app); //create the server
const PORT = process.env.PORT || 4000;

export const io = new Server(server, {
    cors: {origin: "http://localhost:5173"}
});

//Store online users
export const userSocketMap = {}; //{userId: socketId}

//socket.io connection handler
io.on("connection", (socket)=>{
    const userId = socket.handshake.query.userId;
    console.log("User connected", userId);

    if(userId) userSocketMap[userId] = socket.id;

    //emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    //disconnect event
    socket.on("disconnect", ()=> {
        console.log("User disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

//middleware setup
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
        allowedHeaders: [
            'set-cookie',
            'Content-Type',
            'Access-Control-Allow-Origin',
            'Access-Control-Allow-Credentials',
        ],
    })
);

app.use(express.json());

app.get('/', async (req, res)=> {
    res.send('Hello world');
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//Add routes
