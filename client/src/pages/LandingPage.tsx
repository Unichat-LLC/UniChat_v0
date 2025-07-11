import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

export function LandingPage () {
    const navigate = useNavigate();

    const universities = [
        "University of Cincinnati",
        "Ohio State University",
    ];

    const [query, setQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filtered = universities.filter(u =>
        u.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="grid grid-cols-2 auto-rows-auto gap-1 outline-2 outline-offset-2 outline-dashed outline-slate-100 h-full">
            <div className="row-start-1 col-span-2">
                <Header />
            </div>
            <div className="row-start-2 col-span-2 w-[70%]  px-6 pt-20">
                <h1 className="text-bold text-8xl ">Group chats that actually help</h1>
            </div>
            <div className="row-start-3 col-span-2 px-3 py-12 w-[70%]">
                <div className="flex flex-row items-center">
                    <div className="w-1/2 flex flex-col gap-5 items-center">
                        <form className="w-[90%]">
                            <div className="flex w-full">
                                {/* Input wrapper */}
                                <div className="relative flex flex-1">
                                    {/* Icon */}
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            strokeWidth="1.5" 
                                            stroke="currentColor" 
                                            className="w-6 h-6">
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                                        </svg>
                                    </span>

                                    {/* Input */}
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={e => {setQuery(e.target.value); setShowSuggestions(true);}}
                                        className="pl-10 px-3 py-3 w-full text-lg text-gray-900 bg-gray-50 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Search your university..."
                                        required
                                    />
                                    {showSuggestions && query && (
                                        <ul className="absolute top-full left-0 right-0 rounded-lg bg-white border border-gray-200 shadow">
                                        {filtered.length > 0 ? (
                                            filtered.map(u => (
                                            <li
                                                key={u}
                                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => {setQuery(u); setShowSuggestions(false);}}
                                            >
                                                {u}
                                            </li>
                                            ))
                                        ) : (
                                            <li className="px-3 py-2 text-gray-500">No match</li>
                                        )}
                                        </ul>
                                    )}
                                </div>

                                {/* Search button */}
                                <button
                                type="submit"
                                className="px-4 py-3 text-sm font-medium text-white bg-blue-500 rounded-r-lg border border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                >
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                                <span className="sr-only">Search</span>
                                </button>
                            </div>
                        </form>
                        <button onClick={() => navigate("/signup")} className="flex justify-center w-[90%] items-center gap-2 text-lg bg-gray-300 py-2 px-5 rounded-lg hover hover:bg-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>

                            Sync with Canvas
                        </button>
                    </div>
                    <div className="w-1/2 flex flex-col gap-5 items-center">
                        <form className="w-[90%]">
                            <div className="flex w-full">
                                {/* Input wrapper */}
                                <div className="relative flex flex-1">
                                    {/* Icon */}
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            strokeWidth={1.5} 
                                            stroke="currentColor" 
                                            className="w-6 h-6">
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                        </svg>

                                    </span>

                                    {/* Input */}
                                    <input
                                        type="search"
                                        id="search-dropdown"
                                        className="pl-10 pr-3 py-3 w-full text-lg text-gray-900 bg-gray-50 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Search your classes..."
                                        required
                                    />
                                </div>

                                {/* Search button */}
                                <button
                                    type="submit"
                                    className="px-4 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-r-lg border border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                    >
                                    <svg
                                        className="w-4 h-4"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                            </div>
                        </form>
                        <button onClick={() => navigate("/signup")} className="flex justify-center w-[90%] items-center gap-2 text-lg bg-gray-300 py-2 px-5 rounded-lg hover hover:bg-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                            </svg>


                            Join Group Chat
                        </button>
                    </div>
                </div>
            </div>
            <div className="row-start-4 col-start-1 px-9 border-slate-300 pb-12">
                <p className="text-slate-600 text-lg">
                    A platform where students can enter their university and class to join a community group chat for extra assistance with coursework and studying.
                </p>
            </div>
            <div className="row-start-5 col-span-2 border-slate-300">
                <Footer />
            </div>
        </div>
    )
};