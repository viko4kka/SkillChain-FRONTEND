"use client";

import { useStore } from "@/stores/useStore";
import { User } from "@/components/UserFrameInProfilePage";

const useAuth = () => {
  const user = useStore((state) => state.user);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const setUser = useStore((state) => state.setUser);

  const login = (user: User) => setUser(user);
  const logout = () => setUser(null);

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
};

export default useAuth;
