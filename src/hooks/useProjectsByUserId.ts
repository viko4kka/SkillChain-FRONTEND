import { getProjectsByUserId } from "@/lib/getProjectApi";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@/types";
interface PaginatedProjects {
  projects: Project[];
  maxPage: number;
  page: number;
  perPage: number;
  itemsCount: number;
}

export default function useProjectsByUserId(
  userId: number,
  perPage: number,
  page: number,
) {
  const {
    data: data,
    isLoading,
    refetch,
  } = useQuery<PaginatedProjects>({
    queryKey: ["projectsByUserId", userId, perPage, page],
    queryFn: () => getProjectsByUserId(userId, perPage, page),
  });
  return { data, isLoading, refetch };
}
