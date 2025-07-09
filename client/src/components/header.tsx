


export default function Header(){
    return (
        <div className="flex flex-row items-center justify-center gap-x-3 h-full w-full">
            <nav className="flex justify-center text-center gap-5">
                <a href="#" className="hover:underline md:text-lg text-xl">About</a>
                <a href="#" className="hover:underline md:text-lg text-xl">Contact</a>
                <a href="#" className="hover:underline md:text-lg text-xl">Terms and Conditions</a>
                <a href="#" className="hover:underline md:text-lg text-xl">Login</a>
            </nav>
        </div>
    )
}