import { query } from "../middleware/utils.js";

export interface Group {
    id: number;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    members: GroupMember[];
}

export interface GroupMember {
    id: number;
    group_id: number;
    user_id: number;
    role: string;
    is_active: boolean;
    joined_at: Date;
}

type newGroup = Pick<Group, "id" | "name" | "description">;
type newGroupMember = Pick<GroupMember, "group_id" | "user_id" | "role">;

export const GroupModel = {

    // Create group and group member
    async createGroup(data: newGroup): Promise<Group> {
        const members = await this.getGroupMembersByGroup(data.id);
        const params = [data.name, data.description, members];
        const sql = `
            INSERT INTO groups (name, description, members) VALUES ($1, $2, $3) RETURN name, description, members;
        `;
        const [group] = await query<Group>(sql, params);
        return group;
    },

    async createGroupMember(data: newGroupMember): Promise<GroupMember> {
        const params = [data.group_id, data.user_id, data.role];
        const sql = `
            INSERT INTO group_members (group_id, user_id, role) VALUES ($1, $2, $3) RETURN group_id, user_id, role;
        `;
        const [groupMember] = await query<GroupMember>(sql, params);
        return groupMember;
    },

    // Read functions
    async getGroupById(id: number): Promise<Group | null> {
        const [g] = await query<Group>(`
                SELECT name, description, members FROM groups WHERE id = $1;
            `, [id]);
        return g ?? null;
    },
    
    async getGroupByName(name: string): Promise<Group | null> {
        const [group] = await query<Group>(
            `SELECT name, description FROM groups WHERE name = $1;`, [name]
        );
        return group;
    },

    async getGroupMessagesById(groupId: number): Promise<Group | null>{
        const [messages] = await query<Group>(
            `SELECT * FROM messages WHERE group_id = $1 ORDER BY uploaded_at ASC;`, [groupId]
        );

        return messages;
    },

    async getGroupMembersByGroup(groupId: number): Promise<GroupMember | null> {
        const [members] = await query<GroupMember>(
            `SELECT * FROM group_members WHERE group_id = $1;`
        ,[groupId]);
        return members;
    }
}