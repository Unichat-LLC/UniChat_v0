import { useState } from "react"

export default function Login(){
    const [authOption, setAuthOption] = useState("login");
    
    return (
        <div className="font-sans-serif bg-gray-50 h-screen">
            <div className="flex flex-col gap-4 justify-center items-center w-full outline-2 max-w-6xl mx-auto h-full outline-slate-200 outline-offset-2 outline-dashed">
                <h1 className="text-5xl">Unichat</h1>
                {authOption === "login" && (<p className="text-2xl">Sign in to your account</p>)}
                <div className="p-10 border border-gray-200 rounded-xl bg-white shadow-md">
                    {authOption === "login" ? (
                        <div className="grid grid-cols-2 min-w-sm grid-rows-[25%_25%_10%_1fr] gap-5 ">
                            <div className="row-start-1 col-span-2 flex flex-col items-start ">
                                <p className="pb-2">Username/Email</p>
                                <input className="w-full border border-slate-200 p-2 rounded-lg" required></input>
                            </div>
                            <div className="row-start-2 col-span-2 flex flex-col items-start  ">
                                <p className="pb-2">Password</p>
                                <input className="w-full border border-slate-200 p-2 rounded-lg " required></input>
                            </div>
                            <div className="row-start-3 col-start-1 ">
                                <div className="flex items-center mb-4">
                                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    </input>
                                    <label className="m-2 text-sm font-medium text-gray-900 ">Remember me</label>
                                </div>
                            </div>
                            <div className="row-start-3 col-start-2 ">
                                <button className="m-2 text-blue-500 hover hover:text-blue-600 text-sm cursor-pointer">Forgot password?</button>
                            </div>
                            <div className="row-start-4 col-span-2 ">
                                <button className="flex flex-row items-center justify-center bg-blue-500 p-2 rounded-lg text-sm text-white w-full">Sign in</button>
                            </div>
                        </div>
                    ): (
                        <div className="grid grid-cols-2 min-w-sm gap-5 ">
                            <div className="row-start-1 col-span-2 flex flex-col items-start ">
                                <p className="pb-2">Student Email</p>
                                <input className="w-full border border-slate-200  p-2 rounded-lg" required></input>
                            </div>
                            <div className="row-start-2 col-span-2 flex flex-col items-start ">
                                <p className="pb-2">Username</p>
                                <input className="w-full border border-slate-200 p-2 rounded-lg" required></input>
                            </div>
                            <div className="row-start-3 col-span-2 flex flex-col items-start  ">
                                <p className="pb-2">Password</p>
                                <input className="w-full border border-slate-200 p-2 rounded-lg " required></input>
                            </div>
                            <div className="row-start-4 col-span-2 ">
                                <button className="flex flex-row items-center justify-center cursor-pointer bg-blue-500 p-2 rounded-lg text-sm text-white w-full">Sign in</button>
                                <button className="mt-2 text-blue-500 hover hover:text-blue-600 text-sm cursor-pointer">Already have an account?</button>
                            </div>
                            <div className="row-start-5 col-span-2">
                                <p className="text-[0.80rem]">By registering, you agree to Unichat's <strong>Terms of Service</strong> and <strong>Privacy Policy</strong></p>
                            </div>
                        </div>
                    )}
                    
                </div>
                {authOption === "login" && (
                    <div className="flex flex-row items-center">
                        <p className="text-md px-2">Don't have an account?</p>
                        <button onClick={() => setAuthOption("signup")} className="text-blue-500 hover hover:text-blue-600 cursor-pointer">Signup here</button>
                    </div>
                )}
                
            </div>
            
        </div>
        
    )
}