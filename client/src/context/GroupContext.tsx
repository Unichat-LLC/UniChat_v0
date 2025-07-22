import {createContext, useContext, useState, useEffect, type ReactNode} from "react";
import { api } from "../services/api";

interface GroupContext {
  
}

const GroupContext = createContext<GroupContext | undefined>(undefined);

type GroupProviderProps = {
  children: ReactNode;
};

export function GroupProvider({ children }: GroupProviderProps) {
    

    return <GroupContext.Provider value={{}}>
        {children}
    </GroupContext.Provider>
}