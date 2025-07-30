import { Outlet} from "react-router-dom";
import { initSocket, disconnectSocket } from "../lib/socket";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useChat } from "../context/ChatContext";


export default function DashboardLayout() {
  const { user} = useAuth();
  const {getMessages, activeGroup} = useChat();

  useEffect(() => {
    if (!user) return;
    
    let isConnecting = false;

    const handler = (_: any) => {
      if (activeGroup) getMessages(activeGroup.id)
    }
    
    try {
      if (isConnecting) return; // Prevent multiple connection attempts
      isConnecting = true;
      
      const sock = initSocket(user.id);
      
      sock.on("connect", () => {
        console.log("Socket connected successfully");
        isConnecting = false;
      });
      
      sock.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        isConnecting = false;
      });

      sock.on("newMessage", handler);
      
      sock.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
        isConnecting = false;
      });
      
      return () => { 
        isConnecting = false;
        sock.off("connect");
        sock.off("connect_error");
        sock.off("newMessage", handler);
        sock.off("disconnect");
        disconnectSocket(); 
      };
    } catch (error) {
      console.error("Failed to initialize socket:", error);
      isConnecting = false;
    }
  }, [user, activeGroup, getMessages]);


  return (
    <div className="bg-white min-h-screen">
      <div className="flex flex-col items-center min-h-screen">
        <div className="w-screen font-sans-serif mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}