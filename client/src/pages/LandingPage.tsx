import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

export function LandingPage () {
    const navigate = useNavigate();

    return (
        <div className="grid max-w-screen-md mx-auto text-white grid-rows-[30%_1fr_20%] h-full gap-2">
            <div className="row-start-1 flex self-end border border-slate-700">
                {/*<Header />*/}
            </div>
            <div className="row-start-2  flex flex-col items-center px-6 border border-slate-700">
                <h1 className="text-5xl">UChat</h1>
                <p className="mt-4 text-2xl text-center">
                    Collaborate Smarter. Learn Deeper. In Every Course.
                </p>
                <p className="mt-4 text-slate-400 text-md text-center">
                    Our platform integrates seamlessly with Canvas, creating instant group chats for all your courses. 
                    Elevate your learning experience with focused, real-time help that drives academic success. Join your class's conversation today.
                </p>
                <div className="flex flex-row justify-center items-center">
                    <button 
                        onClick={() => navigate("/signup")}
                        className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white
                        px-6 py-3 font-semibold rounded-lg">
                        Get started
                    </button>
                    <button 
                        onClick={() => navigate("/login")}
                        className="mt-6 flex items-center gap-3 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg">
                        Login
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="w-5 h-5"
                        >
                            <path
                            fillRule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                            />
                        </svg>
                    </button>
                </div>
                
            </div>
            

            <div className="row-start-3 border border-slate-700">hi
            </div>
        </div>
    )
};