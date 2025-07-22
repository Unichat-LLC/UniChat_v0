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
