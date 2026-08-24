"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import AddWebsiteModal from "@/components/AddWebsiteModal";
import { useWebsiteStore } from "@/store/useWebsiteStore";
import { toast } from "sonner";
import api from "@/utils/axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface PingLog {
  _id: string;
  url: string;
  status: 'UP' | 'DOWN' | 'SLOW';
  latency: number;
  checkAt: string;
}

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { websites, isLoading, fetchWebsites, deleteWebsite } = useWebsiteStore();

  const [selectedUrl, setSelectedUrl] = useState<string>("");
  const [logs, setLogs] = useState<PingLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);

  useEffect(() => {
    fetchWebsites();
  }, [fetchWebsites]);

  useEffect(() => {
    if (websites.length > 0 && !selectedUrl) {
      setSelectedUrl(websites[0].url);
    }
  }, [websites, selectedUrl]);

  useEffect(() => {
    if (!selectedUrl) return;

    const fetchLogs = async () => {
      try {
        const encodedUrl = encodeURIComponent(selectedUrl);
        const response = await api.get(`/logs/${encodedUrl}`);
        setLogs(response.data);
      } catch (err) {
        console.error("Failed to fetch logs", err);
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 10000);
    return () => clearInterval(interval);
  }, [selectedUrl]);

  const totalMonitors = websites.length;
  const activeMonitors = websites.filter(site => site.isActive).length;
  const pausedMonitors = totalMonitors - activeMonitors;

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      const success = await deleteWebsite(id);
      if (success) {
        toast.success("Monitor deleted successfully!");
        if (websites.find(w => w._id === id)?.url === selectedUrl) {
          setSelectedUrl("");
        }
      } else {
        toast.error("Failed to delete monitor.");
      }
    }
  };

  const chartData = logs.map(log => ({
    time: new Date(log.checkAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    latency: log.latency,
    status: log.status
  }));

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Statistics</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Here is what's happening with your monitors today.</p>
        </div>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Add Monitor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <h4 className="text-slate-500 font-semibold text-sm mb-1 uppercase tracking-wider">Total Monitors</h4>
            <p className="text-3xl font-extrabold text-slate-900">{isLoading ? "..." : totalMonitors}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <h4 className="text-slate-500 font-semibold text-sm mb-1 uppercase tracking-wider">Active Monitors</h4>
            <p className="text-3xl font-extrabold text-slate-900">{isLoading ? "..." : activeMonitors}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <h4 className="text-slate-500 font-semibold text-sm mb-1 uppercase tracking-wider">Paused Monitors</h4>
            <p className="text-3xl font-extrabold text-slate-900">{isLoading ? "..." : pausedMonitors}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 mb-8 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Monitored Websites</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Website Name</th>
                <th className="px-6 py-4">Monitor State</th>
                <th className="px-6 py-4">Check Interval</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500 font-medium">
                    Loading monitors...
                  </td>
                </tr>
              ) : websites.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500 font-medium">
                    No monitors found. Click "Add Monitor" to get started.
                  </td>
                </tr>
              ) : (
                websites.map((site) => (
                  <tr
                    key={site._id}
                    onClick={() => setSelectedUrl(site.url)}
                    className={`hover:bg-slate-50 transition-colors cursor-pointer ${selectedUrl === site.url ? 'bg-indigo-50/40' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{site.name}</div>
                      <div className="text-sm text-slate-500 mt-0.5 font-medium">{site.url}</div>
                    </td>
                    <td className="px-6 py-4">
                      {site.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                          ACTIVE
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                          PAUSED
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600 font-medium">
                        {site.checkInterval || 5} mins
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleDelete(site._id, site.name)}
                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors focus:outline-none"
                        title="Delete Monitor"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Response Times (Latency)</h3>
            <p className="text-sm text-slate-500 mt-0.5">Showing real-time ping data for: <span className="font-semibold text-indigo-600">{selectedUrl || "Select a monitor"}</span></p>
          </div>
        </div>

        <div className="h-72 w-full bg-slate-50 rounded-xl border border-slate-100 p-4 flex flex-col items-center justify-center">
          {logsLoading ? (
            <p className="text-slate-500 font-medium">Loading analytics chart data...</p>
          ) : chartData.length === 0 ? (
            <p className="text-slate-500 font-medium">No ping logs recorded yet for this website. Wait for the next cron cycle.</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} unit="ms" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', color: '#fff', border: 'none' }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                />
                <Line
                  type="monotone"
                  dataKey="latency"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ fill: '#4f46e5', r: 4 }}
                  activeDot={{ r: 8 }}
                  animationDuration={500}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <AddWebsiteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </DashboardLayout>
  );
}