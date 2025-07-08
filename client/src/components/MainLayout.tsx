import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div
      style={{
        background: `
          radial-gradient(at 0% 99%,  #1e1d62 0px, transparent 50%),
          radial-gradient(at 50%  0%,  #36134e 0px, transparent 50%),
          radial-gradient(at 0%  98%,  #010304 0px, transparent 50%),
          radial-gradient(at 10%  5%,  #100f24 0px, transparent 50%),
          #000000
        `,
      }}
      className="h-screen text-white font-sans antialiased flex items-stretch justify-center"
    >
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
}
