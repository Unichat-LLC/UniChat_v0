/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useMemo,
  useCallback
} from "react";
import { api } from "../services/api";
import type { Group, GroupMember, Message } from "../lib/DataTypes";

interface ChatContextValue {
  groups: Group[];
  activeGroup: Group | null;
  members: GroupMember[];
  messages: Message[];
  allGroups: Group[];
  setActiveGroup: (g: Group) => void;
  getGroups: () => Promise<void>;
  getGroupMembers: (groupId: number) => Promise<void>;
  getMessages: (groupId: number) => Promise<void>;
  sendMessage: (groupId: number, content: string) => Promise<void>;
  createGroup: (name: string, description: string) => Promise<void>;
  joinGroup: (groupId: number) => Promise<void>;
  getAllGroups: () => Promise<void>;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

type ChatProviderProps = { children: ReactNode };

export function ChatProvider({ children }: ChatProviderProps) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [allGroups, setAllGroups] = useState<Group[]>([]);
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // 1) Fetch your groups from GET /api/groups
  const getGroups = useCallback(async () => {
    try {
      const res = await api.get<{ groups: Group[] }>("/groups");
      setGroups(res.data.groups);
      if (!activeGroup && res.data.groups.length) {
        setActiveGroup(res.data.groups[0]);
      }
    } catch (error) {
      console.error("Failed to fetch groups:", error);
      // Don't throw error, just log it so Dashboard can still render
    }
  }, []);

  // 2) Fetch members & messages
  const getGroupMembers = useCallback(async (groupId: number) => {
    try {
      const res = await api.get<{ groupMembers: GroupMember[] }>(
        `/groups/${groupId}/members`
      );
      setMembers(res.data.groupMembers);
    } catch (error) {
      console.error("Failed to fetch group members:", error);
      setMembers([]); // Set empty array on error
    }
  }, [getGroups]);

  const getMessages = useCallback(async (groupId: number) => {
    try {
      const res = await api.get<{ groupMessages: Message[] }>(
        `/groups/${groupId}/messages`
      );
      setMessages(res.data.groupMessages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      setMessages([]); // Set empty array on error
    }
  }, []);

  // 3) Send a chat message
  const sendMessage = useCallback(
    async (groupId: number, content: string) => {
      try {
        await api.post<{ newMessage: Message }>(
          `/groups/${groupId}/messages`,
          { message: content }
        );
        await getMessages(groupId);
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    },
    []
  );

  // 4) Create a brand-new group
  const createGroup = useCallback(
    async (name: string, description: string) => {
      try {
        const res = await api.post<{ group: Group }>("/groups", {
          name,
          description,
        });
        // append to the list & switch into it
        setGroups((gList) => [...gList, res.data.group]);
        setActiveGroup(res.data.group);
      } catch (error) {
        console.error("Failed to create group:", error);
      }
    },
    []
  );

  // 5) Join an existing group
  const joinGroup = useCallback(async (groupId: number) => {
    try {
      await api.post(`/groups/${groupId}/join`);
      // once you're in, re-fetch group list & members
      await getGroups();
      if (activeGroup?.id === groupId) {
        await getGroupMembers(groupId);
      }
    } catch (error) {
      console.error("Failed to join group:", error);
    }
  }, [activeGroup, getGroups, getGroupMembers]);

  // 6) Get all groups
  const getAllGroups = useCallback(async () => {
    try {
      const res = await api.get<{ groups: Group[] }>("/groups/all");
      setAllGroups(res.data.groups);
    } catch (error) {
      console.error("Failed to fetch all groups:", error);
    }
  },[])

  // Whenever activeGroup changes, re-fetch its members & messages
  useEffect(() => {
    if (!activeGroup) return;
    getGroupMembers(activeGroup.id);
    getMessages(activeGroup.id);
  }, [activeGroup, getGroupMembers, getMessages]);

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  const value = useMemo(
    () => ({
      groups,
      activeGroup,
      members,
      messages,
      allGroups,
      setActiveGroup,
      getGroups,
      getGroupMembers,
      getMessages,
      sendMessage,
      createGroup,
      joinGroup,
      getAllGroups
    }),
    [
      groups,
      activeGroup,
      members,
      messages,
      allGroups,
      getGroups,
      getGroupMembers,
      getMessages,
      sendMessage,
      createGroup,
      joinGroup,
      getAllGroups
    ]
  );

  return (
    <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be inside ChatProvider");
  return ctx;
}
