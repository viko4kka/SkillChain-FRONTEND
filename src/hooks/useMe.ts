"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "@/lib/getUserApi";
import { User } from "@/components/UserFrameInProfilePage";
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
      if (error.message === "Unauthorized") {
        toast.error("You are not authorized. Please log in.");
      } else {
        toast.error("Failed to fetch user data");
      }
    }
  }, [error]);

  return { me, isLoading, error };
}
