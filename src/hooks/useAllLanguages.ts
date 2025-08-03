import { getAllLanguagesApi } from "@/lib/getSearchApi";
import { useQuery } from "@tanstack/react-query";

interface LanguageOptions {
  data: {
    id: number;
    name: string;
  }[];
}

export function useAllLanguages() {
  const { data: allLanguages, isLoading } = useQuery<LanguageOptions>({
    queryKey: ["allLanguages"],
    queryFn: async () => getAllLanguagesApi(),
  });

  console.log(allLanguages);

  return { allLanguages, isLoading };
}
