import { create } from 'zustand'

interface AuthSate {
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthSate>((set) => ({
    token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
    setToken: (token: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
        }
        set({ token });
    },

    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
        }
        set({ token: null });
    }
}));