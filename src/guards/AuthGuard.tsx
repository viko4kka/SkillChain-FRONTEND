"use client";

import Spinner from "@/components/Spinner";
import useMe from "@/hooks/useMe";
import { useStore } from "@/stores/useStore";
import { useEffect } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { me, isLoading } = useMe();
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    if (me) {
      setUser(me);
    }
  }, [me, setUser]);

  if (isLoading) return <Spinner />;

  if (!me) throw new Error("Unauthorized");

  return <>{children}</>;
};
