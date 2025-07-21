import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth, type SignupData } from "../context/AuthContext";

export default function Login(){
    const [authOption, setAuthOption] = useState("login");
    const [loading, setLoading] = useState(false);
    const [signupLoading, setSignupLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [error, setError] = useState("");
    const {login, signup} = useAuth();
    const navigate = useNavigate();

    const [signupForm, setSignupForm] = useState<SignupData>({
        username:  "",
        email:     "",
        name:      "",
        bio:       "",
        university: "",
        password:  "",
    });

    const onSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try{
            await login(email, password);
            navigate("/dashboard");
        }catch {
            setError("Invalid credentials");
        }finally{
            setLoading(false);
        }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignupForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const onSignup = async(e: React.FormEvent) => {
        e.preventDefault();
        setSignupLoading(true);
        try {
            await signup(signupForm)
            navigate("/dashboard");
        }catch {
            setError("Invalid credentials");
        }finally{
            setSignupLoading(false);
        }
    }
    
    return (
        <div className="font-sans-serif bg-gray-50 h-screen">
            <div className="flex flex-col gap-4 justify-center items-center w-full outline-2 max-w-6xl mx-auto h-full outline-slate-200 outline-offset-2 outline-dashed">
                <h1 className="text-5xl">Unichat</h1>
                {authOption === "login" && (<p className="text-2xl">Sign in to your account</p>)}
                <div className="p-10 border border-gray-200 rounded-xl bg-white shadow-md">
                    {authOption === "login" && (
                        <form onSubmit={onSubmit} className="grid grid-cols-2 min-w-sm grid-rows-[25%_25%_10%_1fr] gap-5 ">
                            <div className="row-start-1 col-span-2 flex flex-col items-start ">
                                <p className="pb-2">Username/Email</p>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} 
                                    className="w-full border border-slate-200 p-2 rounded-lg" required />
                            </div>
                            <div className="row-start-2 col-span-2 flex flex-col items-start  ">
                                <p className="pb-2">Password</p>
                                <input type="password" value={password} onChange={e => setPass(e.target.value)}
                                    className="w-full border border-slate-200 p-2 rounded-lg " required />
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
                                <button disabled={loading}
                                    type="submit" className="flex flex-row items-center justify-center bg-blue-500 p-2 rounded-lg text-sm text-white w-full">
                                    {loading ? "Signing in..." : "Sign in"}
                                </button>
                                {error && <p className="text-red-500 mb-4">{error}</p>}
                            </div>
                        </form>
                    )}
                    {authOption === "signup" && (
                        <>
                            {/* Section heading */}
                            <p className="text-2xl font-semibold mb-6">Create your account</p>

                            {/* Signup form */}
                            <form
                            onSubmit={onSignup}
                            className="w-full max-w-sm flex flex-col gap-5"
                            >
                            <label className="block">
                                <span className="text-gray-700">Username</span>
                                <input
                                name="username"
                                value={signupForm.username}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring"
                                />
                            </label>

                            <label className="block">
                                <span className="text-gray-700">Email</span>
                                <input
                                name="email"
                                type="email"
                                value={signupForm.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring"
                                />
                            </label>

                            <label className="block">
                                <span className="text-gray-700">Name</span>
                                <input
                                name="name"
                                value={signupForm.name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring"
                                />
                            </label>

                            <label className="block">
                                <span className="text-gray-700">Bio</span>
                                <input
                                name="bio"
                                value={signupForm.bio}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring"
                                />
                            </label>

                            <label className="block">
                                <span className="text-gray-700">University</span>
                                <input
                                name="university"
                                value={signupForm.university}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring"
                                />
                            </label>

                            <label className="block">
                                <span className="text-gray-700">Password</span>
                                <input
                                name="password"
                                type="password"
                                value={signupForm.password}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring"
                                />
                            </label>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <button
                                type="submit"
                                disabled={signupLoading}
                                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                            >
                                {signupLoading ? "Signing up…" : "Sign up"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setAuthOption("login")}
                                className="text-center text-sm text-blue-500 hover:underline"
                            >
                                Already have an account?
                            </button>

                            <p className="text-xs text-gray-500 text-center">
                                By registering, you agree to Unichat’s <strong>Terms of Service</strong> and{" "}
                                <strong>Privacy Policy</strong>.
                            </p>
                            </form>
                        </>
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