import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="bg-white min-h-screen">
      <div className="flex flex-col items-center min-h-screen">
        <div className="w-screen font-sans-serif h-screen max-h-screen mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}