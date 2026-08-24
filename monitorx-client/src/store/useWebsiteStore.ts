import { create } from 'zustand';
import api from '@/utils/axios';

interface Tag {
    key: string;
    value: string;
}

export interface Website {
    _id: string;
    name: string;
    url: string;
    checkInterval: number;
    isActive: boolean;
    tags: Tag[];
    createdAt: string;
    updatedAt: string;
}

interface WebsiteState {
    websites: Website[];
    isLoading: boolean;
    error: string | null;
    fetchWebsites: () => Promise<void>;
    addWebsite: (data: { name: string; url: string; checkInterval: number; isActive: boolean; tags: Tag[] }) => Promise<boolean>;
    deleteWebsite: (id: string) => Promise<boolean>;
}

export const useWebsiteStore = create<WebsiteState>((set) => ({
    websites: [],
    isLoading: false,
    error: null,

    fetchWebsites: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get('/websites');
            set({ websites: response.data, isLoading: false });
        } catch (err: any) {
            set({
                error: err.response?.data?.message || "Failed to fetch websites",
                isLoading: false
            });
        }
    },

    addWebsite: async (websiteData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/websites', websiteData);

            set((state) => ({
                websites: [response.data, ...state.websites],
                isLoading: false
            }));
            return true;
        } catch (err: any) {
            set({
                error: err.response?.data?.message || "Failed to add website",
                isLoading: false
            });
            return false;
        }
    },

    deleteWebsite: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await api.delete(`/websites/${id}`);

            set((state) => ({
                websites: state.websites.filter((site) => site._id !== id),
                isLoading: false
            }));
            return true;
        } catch (err: any) {
            set({
                error: err.response?.data?.message || "Failed to delete website",
                isLoading: false
            });
            return false;
        }
    }
}));