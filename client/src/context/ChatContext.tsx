import {createContext, useContext, useState, useEffect, type ReactNode, useMemo, useCallback} from "react";
import { api } from "../services/api";
import type { Group, GroupMember, Message } from "../lib/DataTypes";

interface ChatContextValue {
  groups: Group[];
  activeGroup: Group | null;
  members: GroupMember[];
  messages: Message[];
  setActiveGroup: (g: Group) => void;
  getGroups: () => Promise<void>;
  getGroupMembers: (groupId: number) => Promise<void>;
  getMessages: (groupId: number) => Promise<void>;
  sendMessage: (groupId: number, content: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

type ChatProviderProps = {
  children: ReactNode;
};

export function ChatProvider({ children }: ChatProviderProps) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // Load all groups the user belongs to
  const getGroups = useCallback(async () => {
    const res = await api.get<{ groups: Group[] }>("/groups");
    setGroups(res.data.groups);
    
    //default to first group if nothing's selected yet
    if (!activeGroup && res.data.groups.length) {
      setActiveGroup(res.data.groups[0]);
    }
  }, [activeGroup]);
  
  // Load members for whichever group is active
  const getGroupMembers = useCallback(async (groupId: number) => {
    const res = await api.get<{ groupMembers: GroupMember[] }>(
      `/groups/${groupId}/members`
    );
    setMembers(res.data.groupMembers);
  }, []);

  // Load chat history for the active group
  const getMessages = useCallback(async (groupId: number) => {
    const res = await api.get<{ groupMessages: Message[] }>(
      `/groups/${groupId}/messages`
    );
    setMessages(res.data.groupMessages);
  }, []);

  // Send a new chat message
  const sendMessage = useCallback(async (groupId: number, content: string) => {
    const res = await api.post<{ newMessage: Message }>(
      `/groups/${groupId}/messages`,
      { message: content }
    );
    // Prepend to list so newest appear at top
    setMessages((msgs) => [res.data.newMessage, ...msgs]);
  }, []);

  // Whenever activeGroup changes, re-fetch members & messages
  useEffect(() => {
    if (!activeGroup) return;
    getGroupMembers(activeGroup.id);
    getMessages(activeGroup.id);
  }, [activeGroup]);

  // On mount, load groups
  useEffect(() => {
    getGroups();
  }, []);

  const value = useMemo(() => ({
    groups,
    activeGroup,
    members,
    messages,
    setActiveGroup,
    getGroups,
    getGroupMembers,
    getMessages,
    sendMessage,
  }), [groups, activeGroup, members, messages,
      setActiveGroup, getGroups, getGroupMembers, getMessages, sendMessage]);

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be inside ChatProvider");
  return ctx;
}