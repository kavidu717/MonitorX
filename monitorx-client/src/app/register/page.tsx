"use client"
import { useState } from "react";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export default function RegisterPage() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);

    // register function
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)

        try {
            const response = await api.post("/auth/register", {
                firstName,
                lastName,
                email,
                password,
            });

            localStorage.setItem("registerEmail", email);
            toast.success(response.data.message || "Registration successful! Please check your email for OTP.");
            router.push("/verify-otp")

        } catch (err: any) {
            toast.error(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex bg-slate-50 font-sans text-slate-900 selection:bg-orange-200 selection:text-orange-900">
            {/* Left Side - Hero / Branding Description */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden flex-col justify-between">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-orange-500/40 via-transparent to-transparent"></div>
                <div className="absolute top-1/4 -left-12 w-96 h-96 rounded-full bg-orange-600 blur-3xl opacity-20"></div>
                <div className="absolute bottom-1/4 -right-12 w-72 h-72 rounded-full bg-orange-500 blur-3xl opacity-20"></div>

                <div className="relative z-10 p-16 xl:p-24 h-full flex flex-col justify-between">
                    <div>
                        {/* Logo Area */}
                        <div className="flex items-center gap-3 mb-16">
                            <div className="w-12 h-12 bg-orange-500 text-white flex items-center justify-center rounded-xl font-black text-2xl shadow-lg shadow-orange-500/20">
                                M
                            </div>
                            <span className="font-extrabold text-2xl text-white tracking-tight">MonitorX</span>
                        </div>

                        <h1 className="text-5xl xl:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
                            Join the future <br /> of <span className="text-orange-500">monitoring.</span>
                        </h1>
                        <p className="text-lg text-slate-300 font-medium max-w-md leading-relaxed">
                            Start monitoring your infrastructure, applications, and networks from a single pane of glass in minutes.
                        </p>
                    </div>

                    {/* Features List */}
                    <div className="mt-12 pt-12 border-t border-slate-800">
                        <ul className="space-y-4">
                            {[
                                "Real-time anomaly detection",
                                "Customizable alerting workflows",
                                "Infinite scalability and retention",
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-center text-slate-300 font-medium">
                                    <svg className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-24 bg-white relative shadow-2xl z-10 lg:rounded-l-[2rem]">
                {/* Mobile Logo Fallback */}
                <div className="absolute top-8 left-6 sm:left-12 lg:hidden flex items-center gap-2">
                    <div className="w-10 h-10 bg-orange-500 text-white flex items-center justify-center rounded-lg font-bold text-xl shadow-md">
                        M
                    </div>
                    <span className="font-extrabold text-xl text-slate-900 tracking-tight">MonitorX</span>
                </div>

                <div className="w-full max-w-md mx-auto">
                    <div className="mb-10 lg:mt-0">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Create an account</h2>
                        <p className="text-slate-500 font-medium text-sm">Fill in your details to get started with MonitorX.</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5">
                        <div className="space-y-4">
                            {/* First & Last Name side-by-side */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white shadow-sm transition-all sm:text-sm font-medium"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                        Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white shadow-sm transition-all sm:text-sm font-medium"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-orange-500 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white shadow-sm transition-all sm:text-sm font-medium"
                                        placeholder="john@company.com"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-orange-500 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white shadow-sm transition-all sm:text-sm font-medium"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <p className="mt-2 text-xs text-slate-500 font-medium">Must be at least 8 characters long.</p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-[0_4px_14px_0_rgb(249,115,22,0.39)] text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 hover:shadow-[0_6px_20px_rgba(249,115,22,0.23)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2.5 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Footer Setup */}
                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-sm text-slate-500 font-medium">
                        <span>Already have an account?</span>
                        <Link href="/login" className="text-orange-600 hover:text-orange-500 font-bold transition-colors focus:outline-none focus:underline">
                            Sign in here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}