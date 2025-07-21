import React, {createContext, useContext, useState, useEffect, type ReactNode} from "react";
import { api } from "../services/api";

interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  bio: string;
  university: string;
  created_at: string;
}

interface AuthContext {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    // on mount, try to fetch "/profile", if error, set user to null
    useEffect(() => {
        api.get("/profile")
            .then(res => setUser(res.data.user))
            .catch(() => setUser(null));
    },[]);

    const login = async(email: string, password: string) => {
        const res = await api.post("/login", {email, password});
        setUser(res.data.user);
    };

    const logout = async () => {
        await api.post("/logout");
        setUser(null);
    };

    return <AuthContext.Provider value={{user, login, logout}}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
  const c = useContext(AuthContext);
  if (!c) throw new Error("useAuth must be inside AuthProvider");
  return c;
}