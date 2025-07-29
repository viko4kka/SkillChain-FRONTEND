"use client";

import { logOut } from "@/lib/getUserApi";
import { useStore } from "@/stores/useStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useMe from "./useMe";

const useAuth = () => {
  const { user, isAuthenticated, setUser, setIsAuthenticated } = useStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { me, isLoading } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (me) {
      setUser(me);
      setIsAuthenticated(true);
    }
  }, [me, setUser, setIsAuthenticated]);

  const logout = async () => {
    setIsLoggingOut(true);

    try {
      await logOut();
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
    isLoading,
    logout,
  };
};

export default useAuth;
