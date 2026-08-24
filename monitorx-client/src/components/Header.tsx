"use client"

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function Header() {
    const logout = useAuthStore((state) => state.logout);
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
            <div className="flex items-center gap-4">
                {/* Mobile menu button could go here */}
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">Overview</h2>
            </div>

            <div className="flex items-center gap-6">
                {/* Notifications / Search could go here */}
                <button className="text-slate-400 hover:text-orange-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                </button>

                {/* Profile Dropdown Simulation */}
                <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-bold text-slate-700">Admin User</span>
                        <span className="text-xs font-medium text-slate-500">admin@monitorx.com</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold border-2 border-white shadow-sm ring-2 ring-slate-100">
                        A
                    </div>
                    
                    <button 
                        onClick={handleLogout}
                        className="ml-2 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Logout"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    </button>
                </div>
            </div>
        </header>
    );
}