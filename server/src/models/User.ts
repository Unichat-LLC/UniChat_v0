import { hashPassword, query } from "../middleware/utils.js";

export interface User {
    id: number;
    username: string;
    email: string;
    name: string;
    bio: string | null;
    university: string;
    created_at: Date;
}

type NewUser = Pick<User, "username" | "email" | "name" | "bio" | "university"> & {password: string};
type UpdateUser = Partial<Omit<User, "id" | "created_at">>;

export const UserModel = {
    // Create User
    async createUser(data: NewUser): Promise<User> {
        const hash = await hashPassword(data.password);
        const sql = `
            INSERT INTO users (username, email, name, password, bio, university)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, username, email, name, bio, university, created_at;
        `;
        const params = [data.username, data.email, data.name, hash, data.bio ?? "", data.university];
        const [user] = await query<User>(sql, params)
        return user;
    },

    async findById(id: number): Promise<User | null>{
        const [u] = await query<User>(
            `SELECT id, username, email, name, bio, university, created_at FROM users WHERE id = $1;`,[id],
        );
        return u ?? null;
    },

    async findByEmail(email: string): Promise<User | null>{
        const [u] = await query<User>(
            `SELECT id, username, email, name, bio, university, created_at FROM users WHERE email = $1;`,[email],
        );
        return u ?? null;
    },

    async updateUser(id: number, data: UpdateUser): Promise<User | null>{
        const fields = [];
        const values: any[] = [];
        let i = 1;

        for (const [key,value] of Object.entries(data)){
            fields.push(`${key} = $${i++}`);
            values.push(value);
        }

        if(fields.length === 0) {
            return this.findById(id);
        }

        const sql = `
            UPDATE users
            SET ${fields.join(', ')}
            WHERE id = $${i}
            RETURNING id, username, email, name, bio, university, created_at;
        `;

        values.push(id);

        const [user] = await query<User>(sql, values);
        return user ?? null;
    },

    async updatePassword(id: number, newPassword: string): Promise<void> {
        const hash = await hashPassword(newPassword);
        await query(
            `UPDATE users SET password = $1 WHERE id = $2`,
            [hash, id]
        );
    },

    async remove(id: number): Promise<void>{
        await query(`DELETE FROM users WHERE id = $1;`, [id]);
    },
    
    async getPasswordHash(id: number): Promise<string | null> {
        const [u] = await query<{ password: string }>(
            `SELECT password FROM users WHERE id = $1`,
            [id]
        );
        return u?.password ?? null;
    }
}