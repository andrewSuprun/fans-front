import create from 'zustand';

interface UserState {
  user: {
    name: string;
    email: string;
    phone?: string;
  } | null;
  setUser: (user: { name: string; email: string; phone?: string }) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
