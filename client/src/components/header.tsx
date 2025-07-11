


export default function Header(){
    return (
        <header className="w-full">
            <div className="mx-auto px-6 py-4 flex items-center justify-between">
                {/* Left: logo + nav links */}
                <div className="flex items-center gap-16">
                    <div className="font-bold text-xl">Unichat</div>
                    <nav className="flex gap-16 text-lg">
                        <a href="#" className="hover:underline">About</a>
                        <a href="#" className="hover:underline">Resources</a>
                        <a href="#" className="hover:underline">Pricing</a>
                        <a href="#" className="hover:underline">FAQ</a>
                    </nav>
                </div>

                {/* Right: auth links */}
                <div className="flex items-center gap-4">
                    <a href="#" className="hover:underline text-lg">Login</a>
                    <button className="flex text-white justify-center text-lg items-center gap-2 px-4 py-2 rounded-full bg-blue-500 font-semibold shadow-sm hover:bg-blue-600">
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