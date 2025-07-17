import { UserModel } from "../models/User.js";
import { SessionModel } from "../models/Session.js";
import { verifyPassword } from "../middleware/utils.js";
import { Request, Response } from "express";

const SESSION_LIFETIME_DAYS = 7;

export const signup = async (req: Request, res: Response) => {
    const {username, email, name, bio, university, password} = req.body; //Get the contents of the signup form from req.body

    const user = await UserModel.createUser({username, email, name, bio, university, password}); //create a new user in the DB using createUser method

    const expires_at = new Date(Date.now() + SESSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000);  //calculate the expires at value using current date + temp value of 7 days
    const session = await SessionModel.create(user.id, expires_at);  //get session values by creating a sesion using user_id that is returned from UserModel.createUser method

    res.cookie("session_token", session.session_token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: SESSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000
    });

    res.json({user});
};

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const user = await UserModel.findByEmail(email);
    if(!user) return res.status(401).json({error: "Invalid Credentials"});

    const hash = await UserModel.getPasswordHash(user.id);
    if (!hash) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await verifyPassword(password, hash);
    if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
    }

    const expiresAt = new Date(Date.now() + SESSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000);
    const session = await SessionModel.create(user.id, expiresAt);

    res.cookie("session_token", session.session_token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: SESSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000
    });

    res.json({user});
};

export const logout = async(req: Request, res: Response) => {
    const token = req.cookies?.session_token;
    if(token) {
        await SessionModel.delete(token);
        res.clearCookie("session_token");
    }
    res.json({message: "Logged out"});
}