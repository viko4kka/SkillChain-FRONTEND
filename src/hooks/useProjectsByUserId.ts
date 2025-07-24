import { getProjectsByUserId } from "@/lib/getProjectApi";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@/types";

export default function useProjectsByUserId(userId: number) {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["projectsByUserId", userId],
    queryFn: () => getProjectsByUserId(userId),
  });
  console.log(projects);
  return { projects, isLoading };
}
