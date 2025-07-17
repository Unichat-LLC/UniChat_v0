import { MessageModel } from "../models/Message.js";
import { SessionModel } from "../models/Session.js";
import { GroupModel } from "../models/Group.js";
import { Request, Response } from "express";
import { io } from "../server.js";

// Get all users in a group
export const getGroupMembers = async(req: Request, res: Response) => {
    const groupID = req.group!.id;
    const groupMembers = await GroupModel.getGroupMembersByGroup(groupID);
    
    res.json({groupMembers});
}

// Get Messages in a group
export const getMessages = async(req: Request, res: Response) => {
    const groupId = req.group!.id;
    const groupMessages = await GroupModel.getGroupMessagesById(groupId);

    res.json({groupMessages});
}

// Get messages for a selected user
export const getUserMessages = async(req: Request, res: Response) => {
    const senderId = req.user!.id;
    const userMessages = await MessageModel.getMsgbyUser(senderId);

    res.json({userMessages});
}

// send a message in a group
export const sendMessage = async(req: Request, res: Response) => {
    const { message } = req.body;
    const newMessage = await MessageModel.createMessage({
        group_id: req.group!.id,
        sender_id: req.user!.id,
        message,
    });
    
    io.to(`group-${req.group!.id}`).emit("newMessage", newMessage)
    res.json({newMessage})
}