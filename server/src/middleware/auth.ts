import { SessionModel } from "../models/Session.js";
import { UserModel } from "../models/User.js";
import { Request, Response, NextFunction } from "express";

// Middleware to require authentication for protected routes
export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    // Get the session token from cookies
    const token = req.cookies?.session_token;
    // If no token is found, respond with 401 Unauthorized
    if(!token) return res.redirect("/login");

    // Find the session using the token
    const session = await SessionModel.findByToken(token);
    // If session is not found, respond with 401 Invalid session
    if(!session) return res.redirect("/login");

    // Find the user associated with the session
    const user = await UserModel.findById(session.user_id);
    // If user is not found, respond with 401 Invalid session
    if(!user) return res.redirect("/login");

    // Attach the user object to the request for downstream handlers
    req.user = user;
    // Proceed to the next middleware or route handler
    next();
};