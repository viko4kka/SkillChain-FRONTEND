"use client";

import { User } from "@/components/UserFrameInProfilePage";
import { searchUsers } from "@/lib/getSearchApi";
import { useQuery } from "@tanstack/react-query";

export default function useSearch(debouncedSearchQuery: string) {
  const {
    data: searchResult,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["search", debouncedSearchQuery],
    queryFn: () => searchUsers(debouncedSearchQuery),
    enabled: !!debouncedSearchQuery,
  });

  console.log('dziala useSearch')
  return { searchResult, isLoading, error };
}
