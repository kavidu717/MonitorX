"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const token = useAuthStore((state) => state.token);
    const router = useRouter();

    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (!token) {
            router.push("/login");
        } else {
            setIsChecking(false);
        }
    }, [token, router]);

    if (isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900">
                <svg className="animate-spin h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900 selection:bg-orange-200 selection:text-orange-900 overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Header />

                <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}