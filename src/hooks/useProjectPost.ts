import { postProject } from "@/lib/getProjectApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AddProject } from "@/types";

export default function useProjectPost() {
  const queryClient = useQueryClient();

  const { mutate: addProject, isPending } = useMutation({
    mutationFn: async (project: AddProject) => {
      const result = await postProject(project);
      return result;
    },
    onSuccess: () => {
      toast.success("Project added successfully");
      queryClient.invalidateQueries({ queryKey: ["projectsByUserId"] });
    },
    onError: (error) => {
      toast.error("Failed to add project");
      console.error("Failed to add project:", error);
    },
  });

  return { addProject, isLoading: isPending };
}
