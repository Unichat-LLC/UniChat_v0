import { query } from "../middleware/utils.js";

export interface Session {
    id: number;
    user_id: number;
    session_token: string;
    created_at: Date;
    expires_at: Date;
}


export const SessionModel = {
    async create(userId: number, expiresAt: Date): Promise<Session>{
        const [s] = await query<Session>(
            `INSERT INTO sessions (user_id, session_token, expires_at)
            VALUES ($1, gen_random_uuid(), $2)
            RETURNING *;`, [userId, expiresAt]
        );
        return s;
    },

    async findByToken(token: string): Promise<Session | null>{
        const [s] = await query<Session>(`
        SELECT * FROM sessions WHERE session_token = $1 AND expires_at > now();
        `, [token]);
        return s ?? null;
    },

    async delete(token: string): Promise<void> {
        await query(`DELETE FROM sessions WHERE session_token = $1`, [token]);
    },

    // UNIT TESTING ONLY
    async sessionsClean(): Promise<void> {
        await query(
            `TRUNCATE TABLE sessions RESTART IDENTITY CASCADE`,[null]
        );
    }
};