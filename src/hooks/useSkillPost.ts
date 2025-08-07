import { postSkill } from "@/lib/getSkillApi";
import { AddSkillInput } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useSkillPost() {
  const queryClient = useQueryClient();

  const { mutate: addSkillInput, isPending } = useMutation({
    mutationFn: async (skill: AddSkillInput) => {
      const result = await postSkill(skill);
      return result;
    },
    onSuccess: () => {
      toast.success("Skill added successfully");
      queryClient.invalidateQueries({ queryKey: ["skillsByUserId"] });
    },
    onError: (error) => {
      toast.error("Failed to add skill");
      console.error("Failed to add skill:", error);
    },
  });

  return { addSkillInput, isLoading: isPending };
}
