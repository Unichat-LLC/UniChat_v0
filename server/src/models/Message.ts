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

}