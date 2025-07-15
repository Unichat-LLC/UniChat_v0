import {pool} from "../config/pool.js"

export interface User {
    id: number;
    username: string;
    email: string;
    created_at: Date;
}

export const UserModel = {
    
}