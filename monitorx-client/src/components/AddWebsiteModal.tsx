"use client";

import { useState } from "react";
import { useWebsiteStore } from "@/store/useWebsiteStore";
import { toast } from "sonner";

interface AddWebsiteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddWebsiteModal({ isOpen, onClose }: AddWebsiteModalProps) {
    const { addWebsite, isLoading } = useWebsiteStore();

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [checkInterval, setCheckInterval] = useState(5);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const success = await addWebsite({
            name,
            url,
            checkInterval: Number(checkInterval),
            isActive: true,
            tags: [{ key: "env", value: "production" }]
        });

        if (success) {
            toast.success("Website added successfully!");
            setName("");
            setUrl("");
            setCheckInterval(5);
            onClose();
        } else {
            toast.error("Failed to add website.");
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-slate-800">Add New Monitor</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Website Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="My Portfolio"
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Website URL</label>
                        <input
                            type="url"
                            required
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Check Interval (Minutes)</label>
                        <select
                            value={checkInterval}
                            onChange={(e) => setCheckInterval(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
                        >
                            <option value={1}>Every 1 Minute</option>
                            <option value={5}>Every 5 Minutes</option>
                            <option value={15}>Every 15 Minutes</option>
                            <option value={30}>Every 30 Minutes</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-sm disabled:opacity-50"
                        >
                            {isLoading ? "Saving..." : "Save Monitor"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}