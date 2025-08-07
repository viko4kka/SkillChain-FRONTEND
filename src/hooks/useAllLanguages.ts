import { getAllLanguagesApi } from "@/lib/getLanguageApi";
import { LanguageList } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useAllLanguages() {
  const {
    data: languages,
    isLoading,
    refetch,
  } = useQuery<LanguageList[]>({
    queryKey: ["allLanguages"],
    queryFn: getAllLanguagesApi,
  });
  return { languages, isLoading, refetch };
}
