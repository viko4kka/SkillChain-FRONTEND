"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "@/lib/getUserApi";
import { User } from "@/components/userProfile/UserFrameInProfilePage";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function useMe() {
  const {
    data: me,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: ["me"],
    queryFn: () => fetchMe(),
    retry: false,
  });

  useEffect(() => {
    if (error) {
      toast.dismiss("auth-toast");
      if (error.message === "Unauthorized") {
        toast.error("You are not authorized. Please log in.", {
          id: "auth-toast",
        });
      } else {
        toast.error("Failed to fetch user data", { id: "auth-toast" });
      }
    }
  }, [error]);

  return { me, isLoading, error };
}
