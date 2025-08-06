import { getAllSkillsApi } from "@/lib/getSkillApi";
import { useQuery } from "@tanstack/react-query";
import { SkillList } from "@/types";

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
