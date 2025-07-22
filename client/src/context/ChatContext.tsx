import {createContext, useContext, useState, useEffect, type ReactNode} from "react";
import { api } from "../services/api";

interface ChatContext {
  
}

const ChatContext = createContext<ChatContext | undefined>(undefined);

type ChatProviderProps = {
  children: ReactNode;
};

export function ChatProvider({ children }: ChatProviderProps) {
    

    return <ChatContext.Provider value={{}}>
        {children}
    </ChatContext.Provider>
}