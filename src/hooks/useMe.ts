"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "@/lib/getUserApi";
import { User } from "@/components/UserFrameInProfilePage";

export default function useMe() {
  const { data: me, isLoading } = useQuery<User>({
    queryKey: ["me"],
    queryFn: () => fetchMe(),
  });

  return { me, isLoading };
}
