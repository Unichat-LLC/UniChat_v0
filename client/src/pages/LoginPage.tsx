import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { SignupData } from "../lib/DataTypes";

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
        
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-6xl mx-auto">
                <div className="text-center mb-6">
                    <h1 className="text-6xl font-bold text-black mb-2">
                        Unichat
                    </h1>
                    <p className="text-xl text-gray-600">
                        {authOption === "login" ? "Welcome back! Sign in to your account" : "Join the conversation"}
                    </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
                    <div className="text-center mb-5">
                        <h2 className="text-2xl font-semibold text-black">
                            {authOption === "login" ? "Sign In" : "Create Account"}
                        </h2>
                    </div>

                    {authOption === "login" ? (
                        <form onSubmit={onSubmit} className="max-w-md mx-auto space-y-6 pb-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-black">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-black">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPass(e.target.value)}
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        className="w-4 h-4 text-black bg-white border-gray-300 rounded focus:ring-black"
                                    />
                                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                        Remember me
                                    </label>
                                </div>
                                <button type="button" className="text-black hover:underline text-sm">
                                    Forgot password?
                                </button>
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md border border-red-200">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={onSignup} className="space-y-2">
                            {/* Horizontal Layout for Signup */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-black">Username</label>
                                        <input
                                            name="username"
                                            value={signupForm.username}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                                            placeholder="Choose username"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-black">Email</label>
                                        <input
                                            name="email"
                                            type="email"
                                            value={signupForm.email}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-black">Full Name</label>
                                        <input
                                            name="name"
                                            value={signupForm.name}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-black">Bio</label>
                                        <input
                                            name="bio"
                                            value={signupForm.bio}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                                            placeholder="Tell us about yourself"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-black">University</label>
                                        <input
                                            name="university"
                                            value={signupForm.university}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                                            placeholder="Your university"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-black">Password</label>
                                        <input
                                            name="password"
                                            type="password"
                                            value={signupForm.password}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                                            placeholder="Create a password"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Center Section */}
                            <div className="space-y-4 pt-5 max-w-md mx-auto">
                                {error && (
                                    <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md border border-red-200">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={signupLoading}
                                    className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {signupLoading ? "Creating account..." : "Create Account"}
                                </button>

                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={() => setAuthOption("login")}
                                        className="text-black hover:underline"
                                    >
                                        Already have an account? Sign in
                                    </button>
                                </div>

                                <p className="text-xs text-gray-500 text-center px-4">
                                    By creating an account, you agree to Unichat's{" "}
                                    <button type="button" className="text-black hover:underline">
                                        Terms of Service
                                    </button>{" "}
                                    and{" "}
                                    <button type="button" className="text-black hover:underline">
                                        Privacy Policy
                                    </button>
                                </p>
                            </div>
                        </form>
                    )}
                </div>

                {authOption === "login" && (
                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Don't have an account?{" "}
                            <button
                                onClick={() => setAuthOption("signup")}
                                className="text-black hover:underline"
                            >
                                Sign up here
                            </button>
                        </p>
                    </div>
                )}
            </div>
        </div>
        
    )
}