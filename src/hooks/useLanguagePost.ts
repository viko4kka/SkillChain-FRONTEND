
import { postLanguage } from "@/lib/getLanguageApi";
import { AddLanguageInput } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useLanguagePost() {
  const queryClient = useQueryClient();

  const { mutate: addLanguageInput, isPending } = useMutation({
    mutationFn: async (language: AddLanguageInput) => {
      const result = await postLanguage(language);
      return result;
    },
    onSuccess: () => {
      toast.success("Language added successfully");
      queryClient.invalidateQueries({ queryKey: ["languagesByUserId"] });
    },
    onError: (error) => {
      toast.error("Failed to add language");
      console.error("Failed to add language:", error);
    },
  });

  return { addLanguageInput, isLoading: isPending };
}
