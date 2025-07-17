import bcrypt from "bcryptjs";
import type { QueryResultRow } from "pg";
import { pool } from "../config/pool.js";
import { NextFunction, Request, Response } from "express";
import { GroupModel } from "../models/Group.js";


const ROUNDS = 12;

export async function hashPassword(plain: string): Promise<string>{
    return bcrypt.hash(plain, ROUNDS);
}

export async function verifyPassword(plain:string, hash:string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
}

export async function query<T extends QueryResultRow>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  const { rows } = await pool.query<T>(text, params);
  return rows;
}

export const requireGroup = async(req: Request, res: Response, next: NextFunction) => {
  const groupId = Number(req.params.groupId);
  if(!groupId) return res.status(400).json({error: "No group ID provided"});

  const group = await GroupModel.getGroupById(groupId);
  if(!group) return res.status(404).json({error: "Group not found"});

  req.group = group;
  next();
}