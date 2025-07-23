import { Outlet} from "react-router-dom";
import { initSocket, disconnectSocket } from "../lib/socket";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function DashboardLayout() {
  const { user} = useAuth();

  useEffect(() => {
    if (!user) return;
    
    try {
      const sock = initSocket(user.id);
      
      sock.on("connect", () => {
        console.log("Socket connected successfully");
      });
      
      sock.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        // Don't prevent the Dashboard from loading even if socket fails
      });
      
      sock.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
      });
      
      return () => { 
        sock.off("connect");
        sock.off("connect_error");
        sock.off("disconnect");
        disconnectSocket(); 
      };
    } catch (error) {
      console.error("Failed to initialize socket:", error);
      // Don't prevent the Dashboard from loading
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