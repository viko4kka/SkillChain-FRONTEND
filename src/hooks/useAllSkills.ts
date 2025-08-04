import { getAllSkillsApi } from "@/lib/getSearchApi";
import { useQuery } from "@tanstack/react-query";

type SkillOptions = {
  data: {
    id: number;
    name: string;
  }[];
};

export function useAllSkills() {
  const { data: allSkills, isLoading } = useQuery<SkillOptions>({
    queryKey: ["allSkills"],
    queryFn: async () => getAllSkillsApi(),
  });
  return {
    allSkills,
    isLoading,
  };
}
