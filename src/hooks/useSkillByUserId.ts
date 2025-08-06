import { useQuery } from "@tanstack/react-query";
import { Skill } from "@/types";
import { getSkillsByUserId } from "@/lib/getSkillApi";

export default function useSkillsByUserId(userId: number) {
  const {
    data: skills,
    isLoading,
    refetch,
  } = useQuery<Skill[]>({
    queryKey: ["skillsByUserId", userId],
    queryFn: () => getSkillsByUserId(userId),
  });
  return { skills, isLoading, refetch };
}
