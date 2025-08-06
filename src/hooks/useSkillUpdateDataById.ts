import { editSkillById } from "@/lib/getSkillApi";
import { EditSkill } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useSkillUpdateDataById() {
  const queryClient = useQueryClient();

  const { mutate: editSkillDataById, isPending } = useMutation({
    mutationFn: async (editSkillData: {
      id: number;
      updatedData: Partial<EditSkill>;
    }) => {
      const result = await editSkillById(
        editSkillData.id,
        editSkillData.updatedData,
      );
      return result;
    },
    onSuccess: () => {
      toast.success("Skill updated successfully");
      queryClient.invalidateQueries({ queryKey: ["skillsByUserId"] });
    },
    onError: (error) => {
      toast.error("Failed to update skill");
      console.error("Failed to update skill:", error);
    },
  });
  return { editSkillDataById, isLoading: isPending };
}