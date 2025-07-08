


export default function Header(){
    return (
        <div className="
            grid grid-cols-[auto_1fr_auto_auto_auto]
            items-center justify-center gap-x-3 h-full w-full
            ">
            <div className="pl-5 font-bold text-4xl">Uchat</div>

            <nav className="flex justify-center text-center gap-x-8">
                <a href="#" className="hover:underline text-xl">About</a>
                <a href="#" className="hover:underline text-xl">Contact</a>
                <a href="#" className="hover:underline text-xl">Terms & Conditions</a>
            </nav>

            <a href="#" className="hover:underline text-xl">Login</a>
            <a href="#" className="text-xl rounded-md px-10 py-2 bg-indigo-600 hover:bg-indigo-500">
                Signup
            </a>
        </div>
    )
}