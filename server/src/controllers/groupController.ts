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

// Get all the groups a user is in
export const getGroups = async(req: Request, res: Response) => {
    const userId = req.user!.id; //Get user ID from request
    const groups= await GroupModel.getGroupsForUser(userId);
    res.json({groups})
}

// join a group
export const joinGroup = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const groupId = Number(req.params.groupId);

  // Prevent double–joining (optional)
  const alreadyMember = await GroupModel.getGroupMembersByGroup(groupId)
    .then(mems => mems.some(m => m.user_id === userId));
  if (alreadyMember) {
    return res.status(400).json({ error: "Already a member of this group" });
  }

  // Add them as a regular member
  const newMember = await GroupModel.createGroupMember({
    group_id: groupId,
    user_id: userId,
    role: "member"
  });

  // If they have a socket open, put them into the room
  const socketId = userSocketMap[userId];
  if (socketId) {
    const sock = io.sockets.sockets.get(socketId);
    sock?.join(`group-${groupId}`);
  }

  // Notify the room that someone joined
  io.to(`group-${groupId}`).emit("userJoined", { userId });

  // Return the new member record (or you could return the full member list)
  res.status(201).json({ newMember });
};