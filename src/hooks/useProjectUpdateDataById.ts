import { editProjectById } from "@/lib/getProjectApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AddProject } from "@/types";

export function useProjectUpdateDataById() {
  const queryClient = useQueryClient();

  const { mutate: editProjectDataById, isPending } = useMutation({
    mutationFn: async (editProjectData: {
      id: number;
      updatedData: Partial<AddProject>;
    }) => {
      const result = await editProjectById(
        editProjectData.id,
        editProjectData.updatedData,
      );
      return result;
    },
    onSuccess: () => {
      toast.success("Project updated successfully");
      queryClient.invalidateQueries({ queryKey: ["projectsByUserId"] });
    },
    onError: (error) => {
      toast.error("Failed to update project");
      console.error("Failed to update project:", error);
    },
  });

  return { editProjectDataById, isLoading: isPending };
}
