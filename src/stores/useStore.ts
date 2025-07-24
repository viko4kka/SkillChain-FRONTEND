"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/components/UserFrameInProfilePage";

type StoreProps = {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
};

export const useStore = create<StoreProps>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      isAuthenticated: false,
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
