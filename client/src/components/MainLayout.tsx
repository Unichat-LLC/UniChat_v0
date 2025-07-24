import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="bg-white min-h-screen">
      <div className="flex flex-col items-center min-h-screen">
        <div className="w-full font-sans-serif mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
