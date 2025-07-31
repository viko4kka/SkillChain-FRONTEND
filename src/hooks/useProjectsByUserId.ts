import { getProjectsByUserId } from "@/lib/getProjectApi";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@/types";

export default function useProjectsByUserId(
  userId: number,
  perPage: number,
  page: number,
) {
  const {
    data: projects,
    isLoading,
    refetch,
  } = useQuery<Project[]>({
    queryKey: ["projectsByUserId", userId, perPage, page],
    queryFn: () => getProjectsByUserId(userId, perPage, page),
  });
  return { projects, isLoading, refetch };
}
