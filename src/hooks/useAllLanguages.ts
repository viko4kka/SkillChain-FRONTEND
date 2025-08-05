import { getAllLanguagesApi } from "@/lib/getLanguageApi";
import { useQuery } from "@tanstack/react-query";
import { LanguageList } from "@/types";

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
