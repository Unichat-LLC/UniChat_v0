import { Outlet} from "react-router-dom";
import { initSocket, disconnectSocket } from "../lib/socket";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function DashboardLayout() {
  const { user} = useAuth();

  useEffect(() => {
    if (!user) return;
    
    let isConnecting = false;
    
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
      
      sock.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
        isConnecting = false;
      });
      
      return () => { 
        isConnecting = false;
        sock.off("connect");
        sock.off("connect_error");
        sock.off("disconnect");
        disconnectSocket(); 
      };
    } catch (error) {
      console.error("Failed to initialize socket:", error);
      isConnecting = false;
    }
  }, [user]);


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