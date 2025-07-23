import { query } from "../middleware/utils.js";

export interface Message{
    id: number;
    group_id: number;
    sender_id: number;
    message: string;
    uploaded_at: Date;
}

export interface MessageAttachments {
    id: number;
    message_id: number;
    file_url: string;
    file_type: string;
    created_at: Date;
}

type newMessage = Pick<Message, "group_id" | "sender_id" | "message">;

export const MessageModel = {
    //Create Message
    async createMessage(data: newMessage): Promise<Message> {
        const params = [data.group_id, data.sender_id, data.message];
        const sql = `
            INSERT INTO messages (group_id, sender_id, message)
            VALUES ($1, $2, $3);
            RETURNING *;
        `;
        const [m] = await query<Message>(sql, params);

        return m;
    },


    async getMsgByUser(senderId: number): Promise <Message[]>{
        return query<Message>(`
            SELECT * FROM messages WHERE sender_id = $1 ORDER BY uploaded_at ASC;
        `, [senderId]);
    },

    async deleteMsg(id: number): Promise <void> {
        await query(`DELETE FROM messages WHERE id = $1`, [id]);
    }
}