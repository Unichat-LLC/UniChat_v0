import { SessionModel } from "../models/Session.js";
import { UserModel } from "../models/User.js";
import { Request, Response, NextFunction } from "express";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.session_token;
    if(!token) return res.status(401).json({error: "Unauthorized"});

    const session = await SessionModel.findByToken(token);
    if(!session) return res.status(401).json({error: "Invalid session"});

    const user = await UserModel.findById(session.user_id);
    if(!user) return res.status(401).json({error: "Invalid session"});

    req.user = user;
    next();
};