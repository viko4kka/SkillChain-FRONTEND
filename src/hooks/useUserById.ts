"use client";

import { getUserById } from "@/lib/getUserApi";
import { useQuery } from "@tanstack/react-query";

export default function useUserById(id: number | undefined) {
  const { data: userDataById, isLoading } = useQuery({
    queryKey: ["userDataById", id],
    queryFn: () => getUserById(id),
  });

  return { userDataById, isLoading };
}
