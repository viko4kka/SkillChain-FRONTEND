"use client";

import { logOut } from "@/lib/getUserApi";
import { useStore } from "@/stores/useStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useAuth = () => {
  const { user, isAuthenticated, setUser, setIsAuthenticated } = useStore();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    setIsLoggingOut(true);

    try {
      await logOut();
      console.log("Backend logout successful");
    } catch (error) {
      console.error("Backend logout failed:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.clear();
      sessionStorage.clear();
      router.push("/");
      setIsLoggingOut(false);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoggingOut,
    logout,
  };
};

export default useAuth;
