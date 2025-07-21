import bcrypt from "bcryptjs";
import type { QueryResultRow } from "pg";
import { pool } from "../config/pool.js";
import { NextFunction, Request, Response } from "express";
import { GroupModel } from "../models/Group.js";


const ROUNDS = 12;  //no of salt rounds for hashing

// Hash a plain text password using bcrypt
export async function hashPassword(plain: string): Promise<string>{
    return bcrypt.hash(plain, ROUNDS);
}

// Verify a plain text password against a hashed password
export async function verifyPassword(plain:string, hash:string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
}

// Run a parameterized SQL query and return the result rows
export async function query<T extends QueryResultRow>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  const { rows } = await pool.query<T>(text, params);
  return rows;
}

// Middleware to require a valid group for group-based routes
export const requireGroup = async(req: Request, res: Response, next: NextFunction) => {
  const groupId = Number(req.params.groupId); // Get groupId from route params
  if(!groupId) return res.status(400).json({error: "No group ID provided"});// Validate groupId

  const group = await GroupModel.getGroupById(groupId); // Fetch group from DB
  if(!group) return res.status(404).json({error: "Group not found"}); // Check if group exists

  req.group = group;  // Attach group to request object for downstream handlers
  next();
}