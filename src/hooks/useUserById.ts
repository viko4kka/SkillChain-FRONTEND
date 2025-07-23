"use client";

import { getUserById } from "@/lib/getUserApi";
import { useQuery } from "@tanstack/react-query";

export default function useUserById(id: number) {
  const { data: userDataById, isLoading } = useQuery({
    queryKey: ["userDataById", id],
    queryFn: () => getUserById(id),
  });

  console.log(id);
  return { userDataById, isLoading };
}
