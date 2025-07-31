import { deleteProjectById } from "@/lib/getProjectApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useProjectDelete() {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteProject, isPending: isLoading } = useMutation({
    mutationFn: async (id: number) => {
      return await deleteProjectById(id);
    },
    onSuccess: () => {
      toast.success("Project deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["projectsByUserId"] });
    },
    onError: (error) => {
      toast.error("Failed to delete project");
      console.error("Failed to delete project:", error);
    },
  });

  return { deleteProject, isLoading };
}
