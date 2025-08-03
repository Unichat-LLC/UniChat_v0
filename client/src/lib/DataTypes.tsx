export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  bio: string;
  university: string;
  created_at: string;
}

export interface SignupData {
  username: string;
  email:    string;
  name:     string;
  bio:      string;
  university: string;
  password: string;
}

export interface UpdateProfileData {
  username?: string;
  email?: string;
  name?: string;
  bio?: string;
  university?: string;
  password?: string;
}

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
    user: User;
}

export interface Message{
    id: number;
    group_id: number;
    sender_id: number;
    message: string;
    uploaded_at: Date;
}

export interface JoinGroupResponse {
  newMember:   GroupMember;
}