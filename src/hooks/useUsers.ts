"use client";

import { User } from "@/components/UserFrameInProfilePage";
import { getUsers } from "@/lib/getSearchApi";

import { useQuery } from "@tanstack/react-query";

export default function useUsers() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return { users, isLoading, error };
}
