import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div
      style={{
        backgroundImage: `
        radial-gradient(circle at top, #1e2963 45%, #06083a 50%, #000 55%)
        `
      }}
      className="h-screefont-sans antialiased flex items-stretch justify-center"
    >
      <div className="flex flex-col items-center h-screen">
        <Outlet />
      </div>
    </div>
  );
}
