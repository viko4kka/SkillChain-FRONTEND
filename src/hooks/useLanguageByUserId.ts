import { useQuery } from "@tanstack/react-query";
import { Language } from "@/types";
import { getLanguagesByUserId } from "@/lib/getLanguageApi";

export default function useLanguagesByUserId(userId: number) {
  const {
    data: languages,
    isLoading,
    refetch,
  } = useQuery<Language[]>({
    queryKey: ["languagesByUserId", userId],
    queryFn: () => getLanguagesByUserId(userId),
  });
  return { languages, isLoading, refetch };
}
