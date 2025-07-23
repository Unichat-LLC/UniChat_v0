import { UserModel } from "../models/User.js";
import { SessionModel } from "../models/Session.js";
import { verifyPassword } from "../middleware/utils.js";
import { Request, Response } from "express";
import { GroupModel } from "../models/Group.js";
import { MessageModel } from "../models/Message.js";

const SESSION_LIFETIME_DAYS = 7;

// Handle user signup: create user, create session, set cookie, return user
export const signup = async (req: Request, res: Response) => {
    const {username, email, name, bio, university, password} = req.body; // Get signup form data

    const user = await UserModel.createUser({username, email, name, bio, university, password}); // Create user in DB

    const expires_at = new Date(Date.now() + SESSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000); // Session expiry date
    const session = await SessionModel.create(user.id, expires_at); // Create session for user

    // Set session token cookie
    res.cookie("session_token", session.session_token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: SESSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000
    });

    res.json({user});
};

// Handle user login: verify credentials, create session, set cookie, return user
export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const user = await UserModel.findByEmail(email); // Find user by email
    if(!user) return res.status(401).json({error: "Invalid Credentials"});

    const hash = await UserModel.getPasswordHash(user.id); // Get password hash
    if (!hash) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await verifyPassword(password, hash); // Verify password
    if (!valid) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const expiresAt = new Date(Date.now() + SESSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000); // Session expiry
    const session = await SessionModel.create(user.id, expiresAt); // Create session

    // Set session token cookie
    res.cookie("session_token", session.session_token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: SESSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000
    });

    res.json({user});
};

// Handle user logout: delete session, clear cookie
export const logout = async(req: Request, res: Response) => {
    const token = req.cookies?.session_token;
    if(token) {
        await SessionModel.delete(token); // Delete session from DB
        res.clearCookie("session_token"); // Remove cookie
    }
    res.json({message: "Logged out"});
}

// Handle profile update: update user fields, optionally update password
export const updateProfile = async(req: Request, res: Response) => {
    const id = req.user!.id;
    const {username, email, name, bio, university, password} = req.body; // Get profile update data

    const user = await UserModel.updateUser(id, {username, email, name, bio, university} ); // Update user fields

    let passwordUpdated = false;
    if (password) {
        await UserModel.updatePassword(id, password); // Update password if provided
        passwordUpdated = true;
    }
    res.json({user, passwordUpdated});
}

// UNIT TESTING ONLY !!!!
export const cleanAllTables = async() => {
    if (process.env.NODE_ENV === 'production') {
        throw new Error('Clean operation not allowed in production');
    }
    
    await MessageModel.messagesClean();
    await GroupModel.groupMembersClean();
    await SessionModel.sessionsClean();
    await GroupModel.groupsClean();
    await UserModel.usersClean();
}