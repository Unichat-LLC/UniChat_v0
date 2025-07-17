import { Request, Response } from "express";
import { GroupModel } from "../models/Group.js";

export const createGroup = async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ error: "Name and description are required" });
    }

    const group = await GroupModel.createGroupWithOwner(
        { name, description },
        userId
    );

    res.status(201).json({ group });
};

export const leaveGroup = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const groupId = req.group!.id;

    await GroupModel.removeMember(groupId, userId);

    res.json({ message: "You have left the group." });
};