import { Outlet} from "react-router-dom";
import { initSocket } from "../lib/socket";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function DashboardLayout() {
  const { user, logout} = useAuth();

  useEffect(() => {
    if (!user) return;
    const sock = initSocket(user.id);
    sock.on("connect", ()=>console.log("🔌 socket up"));
    return () => { sock.disconnect(); };
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