import { User } from "@/components/UserFrameInProfilePage";
import { getSearchApi } from "@/lib/getSearchApi";
import { useQuery } from "@tanstack/react-query";

export default function useSearch(searchQuery: string) {
  const { data: searchResult, isLoading } = useQuery<User[]>({
    queryKey: ["search", searchQuery],
    queryFn: () => getSearchApi(searchQuery),
    enabled: !!searchQuery,
  });

  return { searchResult, isLoading };
}
