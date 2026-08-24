import Link from "next/link";

export default function Sidebar() {
    return (
        <div className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col relative overflow-hidden shadow-2xl">
            {/* Decorative background glow */}
            <div className="absolute top-0 left-0 w-full h-64 opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent pointer-events-none"></div>

            <h2 className="p-6 font-extrabold text-2xl text-white tracking-tight flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-orange-500 text-white flex items-center justify-center rounded-xl font-black text-xl shadow-lg shadow-orange-500/20">
                    M
                </div>
                MonitorX
            </h2>

            <nav className="flex-1 px-4 py-4 space-y-2 relative z-10 mt-4">
                <Link href="/" className="block px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-slate-400 hover:bg-slate-800/80 hover:text-orange-400 hover:shadow-sm">
                    Dashboard
                </Link>
                <Link href="/monitors" className="block px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-slate-400 hover:bg-slate-800/80 hover:text-orange-400 hover:shadow-sm">
                    Monitors
                </Link>
                <Link href="/settings" className="block px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-slate-400 hover:bg-slate-800/80 hover:text-orange-400 hover:shadow-sm">
                    Settings
                </Link>
            </nav>
        </div>
    );
}