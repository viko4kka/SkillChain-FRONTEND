import { getAllSkillsApi } from "@/lib/getSkillApi";
import { SkillList } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useAllSkills() {
  const {
    data: skills,
    isLoading,
    refetch,
  } = useQuery<SkillList[]>({
    queryKey: ["allSkills"],
    queryFn: getAllSkillsApi,
  });
  return { skills, isLoading, refetch };
}
