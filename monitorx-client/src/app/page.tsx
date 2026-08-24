"use client"

import DashboardLayout from "@/components/DashboardLayout";

export default function HomePage() {
  return (
    <DashboardLayout>
      {/* Header section for page */}
      <div className="mb-8 flex justify-between items-end">
        <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Statistics</h1>
            <p className="text-slate-500 font-medium text-sm mt-1">Here is what's happening with your monitors today.</p>
        </div>
        <div>
            <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                Add Monitor
            </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Total Monitors Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-blue-50 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
                <h4 className="text-slate-500 font-semibold text-sm mb-1 uppercase tracking-wider">Total Monitors</h4>
                <p className="text-3xl font-extrabold text-slate-900">5</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 relative z-10">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </div>
        </div>

        {/* UP Status Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-green-50 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
                <h4 className="text-slate-500 font-semibold text-sm mb-1 uppercase tracking-wider">UP Status</h4>
                <p className="text-3xl font-extrabold text-slate-900">4</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 relative z-10">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
        </div>

        {/* DOWN Status Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-red-50 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
                <h4 className="text-slate-500 font-semibold text-sm mb-1 uppercase tracking-wider">DOWN Status</h4>
                <p className="text-3xl font-extrabold text-slate-900">1</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 relative z-10">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </div>
        </div>

      </div>

      {/* Main Content Area (Chart Placeholder) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Response Times</h3>
            <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5 font-medium outline-none">
                <option>Last 24 hours</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
            </select>
        </div>
        <div className="h-72 w-full bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center justify-center border-dashed">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-slate-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
            </div>
            <p className="text-slate-500 font-medium">Chart Component will be placed here</p>
            <p className="text-slate-400 text-sm mt-1">Data visualization is pending implementation.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}