import { query } from "../middleware/utils.js";
import { io } from "../server.js";
import type { Message } from "./Message.js";

export interface Group {
    id: number;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}

export interface GroupMember {
    id: number;
    group_id: number;
    user_id: number;
    role: string;
    is_active: boolean;
    joined_at: Date;
}

type newGroup = Pick<Group,  "name" | "description">;
type newGroupMember = Pick<GroupMember, "group_id" | "user_id" | "role">;
type updateGroup = Partial<Omit<Group, "id" | "created_at" | "members" | "updated_at">>;

export const GroupModel = {

    // Create group and group member
    async createGroup(data: newGroup): Promise<Group> {
        const params = [data.name, data.description];
        const sql = `
            INSERT INTO groups (name, description) VALUES ($1, $2) RETURNING id, name, description, created_at, updated_at;
        `;
        const [group] = await query<Group>(sql, params);
        return group;
    },

    async createGroupMember(data: newGroupMember): Promise<GroupMember> {
        const params = [data.group_id, data.user_id, data.role];
        const sql = `
            INSERT INTO group_members (group_id, user_id, role) VALUES ($1, $2, $3) RETURNING id, group_id, user_id, role, is_active, joined_at;
        `;
        const [groupMember] = await query<GroupMember>(sql, params);
        return groupMember;
    },

    async createGroupWithOwner(
        groupData: newGroup,
        userId: number
    ): Promise<Group> {
        // create group
        const group = await this.createGroup(groupData);
        

        // add owner as first member
        await this.createGroupMember({
            group_id: group.id,
            user_id: userId,
            role: "owner"
        });
        io.to(`group-${group.id}`).emit("userJoined", { userId });

        return group;
    },

    // Read functions
    async getGroupById(id: number): Promise<Group | null> {
        const [g] = await query<Group>(`
                SELECT id, name, description, created_at, updated_at FROM groups WHERE id = $1;
            `, [id]);
        return g ?? null;
    },
    
    async getGroupByName(name: string): Promise<Group | null> {
        const [group] = await query<Group>(
            `SELECT id, name, description, created_at, updated_at FROM groups WHERE name = $1;`, [name]
        );
        return group;
    },

    async getGroupMessagesById(groupId: number): Promise<Message[]> {
        return query<Message>(`
            SELECT * FROM messages WHERE group_id = $1 ORDER BY uploaded_at ASC;
        `, [groupId]);
    },

    async getGroupMembersByGroup(groupId: number): Promise<GroupMember[]> {
        return query<GroupMember>(`
            SELECT * FROM group_members WHERE group_id = $1;
        `, [groupId]);
    },
    
    async getGroupsForUser(userId: number): Promise<Group[]> {
        return query<Group>(
            `SELECT g.id, g.name, g.description, g.created_at, g.updated_at
            FROM groups g
            JOIN group_members gm ON g.id = gm.group_id
            WHERE gm.user_id = $1`,
            [userId]
        );
    },

    async getAllGroups(): Promise<Group[]> {
        return query<Group>(
            `SELECT * FROM groups`
        );
    },

    // Update methods
    async updateGroup(id: number, data: updateGroup): Promise<Group | null> {
        const fields = [];
        const values: any[] = [];
        let i = 1;

        for (const [key,value] of Object.entries(data)){
            fields.push(`${key} = $${i++}`);
            values.push(value);
        }

        if(fields.length === 0) {
            return this.getGroupById(id);
        }

        const sql = `
            UPDATE groups
            SET ${fields.join(', ')}, updated_at = now()
            WHERE id = $${i}
            RETURNING id, name, description, created_at, updated_at;
        `;

        values.push(id);

        const [group] = await query<Group>(sql, values);
        return group ?? null;
    },

    async removeMember(groupId: number, userId: number): Promise<void> {
        await query(
            `DELETE FROM group_members WHERE group_id = $1 AND user_id = $2`,
            [groupId, userId]
        );
    },


    // UNIT TESTING ONLY
    async groupsClean(): Promise<void> {
        await query(
            `TRUNCATE TABLE groups RESTART IDENTITY CASCADE`,[null]
        );
    },
    async groupMembersClean(): Promise<void> {
        await query(
            `TRUNCATE TABLE group_members RESTART IDENTITY CASCADE`, [null]
        );
    }
}