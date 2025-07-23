import {  useNavigate } from "react-router-dom";



export default function Header(){
    const navigate = useNavigate();
    return (
        <header className="w-full">
            <div className="max-w-6xl mx-auto bg-gray-50 px-6 py-4 flex items-center justify-between">
                {/* Left: logo + nav links */}
                <div className="flex items-center gap-16">
                    <button onClick={() => navigate("/")} className="cursor-pointer font-bold text-lg">Unichat</button>
                    <nav className="flex gap-16 text-lg">
                        <button onClick={()=>navigate("/about")} className="hover:underline">About</button>
                        <button onClick={()=>navigate("/resources")} className="hover:underline">Resources</button>
                        <button onClick={()=>navigate("/pricing")} className="hover:underline">Pricing</button>
                        <button onClick={() => navigate("/faq")} className="hover:underline">FAQ</button>
                    </nav>
                </div>

                {/* Right: auth links */}
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate("/login")} className="hover:underline text-lg">Login</button>
                    <button onClick={() => navigate("/contact")} className="flex text-white justify-center text-lg items-center gap-2 px-4 py-2 rounded-full bg-black font-semibold shadow-sm hover:bg-gray-800">
                        Contact us
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="w-4 h-4"
                        >
                            <path
                            fillRule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}