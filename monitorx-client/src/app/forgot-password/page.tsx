"use client"
import React, { useState } from "react"
import api from "@/utils/axios";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function forgotPasswordPage() {

    const router = useRouter();
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    //handle sunmit function
    const handleForgotPassword = async (e: React.FormEvent) => {

        e.preventDefault()
        setLoading(true)

        try {
            const response = await api.post("/auth/forgot-password", { email });
            toast.success(response.data.message || "OTP has been sent to your email.");
            localStorage.setItem("resetEmail", email);

            router.push("/reset-password");

        } catch (err: any) {

            toast.error(err.response?.data?.message || "Something went wrong. Please try again.");

        } finally {
            setLoading(false)
        }




    }

    return (
        <div className="min-h-screen flex bg-slate-50 font-sans text-slate-900 selection:bg-orange-200 selection:text-orange-900">
            {/* Left Side - Hero / Branding Description */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden flex-col justify-between">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-orange-500/40 via-transparent to-transparent"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-orange-600 blur-3xl opacity-20"></div>
                <div className="absolute top-1/4 -right-12 w-72 h-72 rounded-full bg-orange-500 blur-3xl opacity-20"></div>

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
                            Regain access to your <span className="text-orange-500">dashboard.</span>
                        </h1>
                        <p className="text-lg text-slate-300 font-medium max-w-md leading-relaxed">
                            No worries if you forgot your password. We'll send you an OTP to your registered email address to help you securely reset it and get back on track.
                        </p>
                    </div>

                    {/* Trust Badges / Stats */}
                    <div className="mt-12 pt-12 border-t border-slate-800">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <div className="text-3xl font-bold text-white mb-1">Secure</div>
                                <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">Authentication</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white mb-1">Fast</div>
                                <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">Recovery Process</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Forgot Password Form */}
            <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-24 bg-white relative shadow-2xl z-10 lg:rounded-l-[2rem]">
                {/* Mobile Logo Fallback */}
                <div className="absolute top-8 left-6 sm:left-12 lg:hidden flex items-center gap-2">
                    <div className="w-10 h-10 bg-orange-500 text-white flex items-center justify-center font-bold text-xl shadow-md">
                        M
                    </div>
                    <span className="font-extrabold text-xl text-slate-900 tracking-tight">MonitorX</span>
                </div>

                <div className="w-full max-w-md mx-auto">
                    <div className="mb-10 lg:mt-0">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Forgot password?</h2>
                        <p className="text-slate-500 font-medium text-sm">Enter the email associated with your account and we'll send an OTP to reset your password.</p>
                    </div>

                    <form onSubmit={handleForgotPassword} className="space-y-5">
                        {/* Form Fields */}
                        <div className="space-y-4">
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
                                        placeholder="admin@monitorx.com"
                                    />
                                </div>
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
                                        Sending OTP...
                                    </>
                                ) : (
                                    "Send OTP"
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Footer Setup */}
                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-sm text-slate-500 font-medium">
                        <span>Remember your password?</span>
                        <Link href="/login" className="text-orange-600 hover:text-orange-500 font-bold transition-colors focus:outline-none focus:underline flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}