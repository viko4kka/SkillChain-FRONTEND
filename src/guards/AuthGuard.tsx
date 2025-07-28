"use client";

import Spinner from "@/components/Spinner";
import useAuth from "@/hooks/useAuth";
import useMe from "@/hooks/useMe";
import { useStore } from "@/stores/useStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, isAuthenticated } = useAuth();
  const { me, isLoading } = useMe();
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    if (isLoading) return;

    if (!me) {
      router.replace("/login");
    }
  }, [isAuthenticated, user, me, router, isLoading]);

  useEffect(() => {
    if (me) {
      setUser(me);
    }
  }, [me, setUser]);

  if (isLoading) return <Spinner />;

  return <>{children}</>;
};
