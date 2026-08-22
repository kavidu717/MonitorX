"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

export default function VerifyOtpPage() {

    const router = useRouter();
    const setToken = useAuthStore((state) => state.setToken);

    const [otp, setOTP] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const savedEmail = localStorage.getItem("registerEmail")
        if (!savedEmail) {
            router.push("/register");

        } else {
            setEmail(savedEmail)
        }

    }, [router])

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        
        try {
            const response = await api.post("/auth/verify-otp", {
                email,
                otp,
            });

            const token = response.data.accessToken;
            setToken(token);

            localStorage.removeItem("registerEmail");

            toast.success("Identity verified successfully!");
            router.push("/");

        } catch (err: any) {
            toast.error(err.response?.data?.message || "Invalid OTP. Please try again.");
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
                <div className="absolute top-1/2 -left-20 w-96 h-96 rounded-full bg-orange-600 blur-3xl opacity-20"></div>
                <div className="absolute -bottom-12 -right-12 w-72 h-72 rounded-full bg-orange-500 blur-3xl opacity-20"></div>

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
                            Verify your <br /> <span className="text-orange-500">identity.</span>
                        </h1>
                        <p className="text-lg text-slate-300 font-medium max-w-md leading-relaxed">
                            Security is our top priority. We've sent a one-time password to your email to verify your account.
                        </p>
                    </div>

                    {/* Security Badge */}
                    <div className="mt-12 pt-12 border-t border-slate-800">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">Enterprise-grade security</div>
                                <div className="text-sm text-slate-400">Your data is encrypted and secure.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - OTP Form */}
            <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-24 bg-white relative shadow-2xl z-10 lg:rounded-l-[2rem]">
                {/* Mobile Logo Fallback */}
                <div className="absolute top-8 left-6 sm:left-12 lg:hidden flex items-center gap-2">
                    <div className="w-10 h-10 bg-orange-500 text-white flex items-center justify-center rounded-lg font-bold text-xl shadow-md">
                        M
                    </div>
                    <span className="font-extrabold text-xl text-slate-900 tracking-tight">MonitorX</span>
                </div>

                <div className="w-full max-w-md mx-auto">
                    <div className="mb-10 lg:mt-0 text-center lg:text-left">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-6 lg:mb-8">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Check your email</h2>
                        <p className="text-slate-500 font-medium text-sm">
                            We've sent a 6-digit verification code to <br className="hidden lg:block"/>
                            <span className="font-bold text-slate-800">{email || "your email address"}</span>.
                        </p>
                    </div>

                    <form onSubmit={handleVerify} className="space-y-6">
                        <div>
                            <label htmlFor="otp" className="block text-sm font-semibold text-slate-700 mb-2">
                                Verification Code
                            </label>
                            <input
                                id="otp"
                                type="text"
                                maxLength={6}
                                required
                                value={otp}
                                onChange={(e) => setOTP(e.target.value.replace(/[^0-9]/g, ''))} 
                                className="block w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white shadow-sm transition-all text-center text-3xl font-bold tracking-[0.5em]"
                                placeholder="------"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading || otp.length < 6}
                                className="w-full flex justify-center items-center py-4 px-4 rounded-xl shadow-[0_4px_14px_0_rgb(249,115,22,0.39)] text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 hover:shadow-[0_6px_20px_rgba(249,115,22,0.23)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2.5 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Verifying...
                                    </>
                                ) : (
                                    "Verify Account"
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Footer Setup */}
                    <div className="mt-10 pt-6 border-t border-slate-100 text-center flex flex-col gap-2 text-sm text-slate-500 font-medium">
                        <p>Didn't receive the email?</p>
                        <button type="button" className="text-orange-600 hover:text-orange-500 font-bold transition-colors focus:outline-none focus:underline">
                            Click to resend
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}