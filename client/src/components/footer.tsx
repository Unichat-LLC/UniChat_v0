import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-50 border border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-2xl font-semibold text-black">Unichat</span>
          </div>

          {/* Right: Navigation */}
          <nav className="flex flex-wrap gap-6">
            <button
              onClick={() => navigate("/about")}
              className="text-gray-500 font-semibold hover:text-black text-sm p-0"
            >
              About
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="text-gray-500 font-semibold hover:text-black text-sm p-0"
            >
              Contact
            </button>
            <button 
              onClick={() => navigate("/pricing")}
              className="text-gray-500 font-semibold hover:text-black text-sm p-0"
            >
              Pricing
            </button>
            <button
              className="text-gray-500 font-semibold hover:text-black text-sm p-0"
            >
              Privacy Policy
            </button>
            <button
              className="text-gray-500 font-semibold hover:text-black text-sm p-0"
            >
              Terms of Service
            </button>
          </nav>
        </div>

        <div className="my-8 border border-gray-200" />

        <div className="text-center text-sm text-gray-500">
          <p>© 2025 Unichat™. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}