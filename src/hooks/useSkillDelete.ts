import { deleteSkillById } from "@/lib/getSkillApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useSkillDelete() {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteSkill, isPending: isLoading } = useMutation({
    mutationFn: async (id: number) => {
      return await deleteSkillById(id);
    },
    onSuccess: () => {
      toast.success("Skill deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["skillsByUserId"] });
    },
    onError: (error) => {
      toast.error("Failed to delete skill");
      console.error("Failed to delete skill:", error);
    },
  });

  return { deleteSkill, isLoading };
}
