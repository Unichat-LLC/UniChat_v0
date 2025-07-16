import { query } from "../middleware/utils.js";

export interface Group {
    id: number;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    members: GroupMembers;
}

export interface GroupMembers {
    id: number;
    group_id: number;
    user_id: number;
    role: string;
    is_active: Boolean;
    joined_at: number;
}

