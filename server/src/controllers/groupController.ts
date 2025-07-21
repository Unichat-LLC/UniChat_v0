import { Request, Response } from "express";
import { GroupModel } from "../models/Group.js";
import { io, userSocketMap } from "../server.js";

// Create a new group with the current user as the owner
export const createGroup = async (req: Request, res: Response) => {
    const userId = req.user!.id; // Get user ID from request

    const { name, description } = req.body; // Get group name and description from request body

    // Validate required fields
    if (!name || !description) {
        return res.status(400).json({ error: "Name and description are required" });
    }

    // Create the group and assign the current user as owner
    const group = await GroupModel.createGroupWithOwner(
        { name, description },
        userId
    );

    res.status(201).json({ group }); // Return the created group
};

// Remove the current user from a group
export const leaveGroup = async (req: Request, res: Response) => {
    const userId = req.user!.id; // Get user ID from request
    const groupId = req.group!.id; // Get group ID from request

    await GroupModel.removeMember(groupId, userId); // Remove user from group in DB

    // Remove user from the group's Socket.IO room if connected
    const socketId = userSocketMap[userId];
    if (socketId) {
        const socket = io.sockets.sockets.get(socketId);
        socket?.leave(`group-${groupId}`);
    }

    // Notify all group members that the user has left
    io.to(`group-${groupId}`).emit("userLeft", { userId });

    res.json({ message: "You have left the group." }); // Respond with confirmation
};