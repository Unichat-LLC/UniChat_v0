import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-gray-50 border border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: logo + nav links */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => navigate("/")}
            className="font-semibold text-xl text-black hover:text-primary p-0 cursor-pointer"
          >
            Unichat
          </button>
          <nav className="hidden md:flex gap-6">
            <button
              onClick={() => navigate("/about")}
              className="text-gray-500 text-[0.95rem] font-semibold hover:text-black cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => navigate("/resources")}
              className="text-gray-500 text-[0.95rem] font-semibold hover:text-black cursor-pointer"
            >
              Resources
            </button>
            <button
              onClick={() => navigate("/pricing")}
              className="text-gray-500 text-[0.95rem] font-semibold hover:text-black cursor-pointer"
            >
              Pricing
            </button>
            <button
              onClick={() => navigate("/faq")}
              className="text-gray-500 text-[0.95rem] font-semibold hover:text-black cursor-pointer"
            >
              FAQ
            </button>
          </nav>
        </div>

        {/* Right: auth links */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/login")}
            className="text-gray-500 text-[0.95rem] hover:text-black font-semibold cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="bg-black text-white text-[0.95rem] font-semibold hover:bg-gray-800 px-4 py-2 rounded-lg flex items-center cursor-pointer"
          >
            Contact us
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}