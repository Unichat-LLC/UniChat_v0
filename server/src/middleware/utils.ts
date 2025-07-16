import bcrypt from "bcryptjs";
import type { QueryResultRow } from "pg";
import { pool } from "../config/pool.js";


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