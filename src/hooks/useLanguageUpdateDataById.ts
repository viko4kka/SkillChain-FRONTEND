import { editLanguageById } from "@/lib/getLanguageApi";
import { EditLanguage } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useLanguageUpdateDataById() {
  const queryClient = useQueryClient();

  const { mutate: editLanguageDataById, isPending } = useMutation({
    mutationFn: async (editLanguageData: {
      id: number;
      updatedData: Partial<EditLanguage>;
    }) => {
      const result = await editLanguageById(
        editLanguageData.id,
        editLanguageData.updatedData,
      );
      return result;
    },
    onSuccess: () => {
      toast.success("Language updated successfully");
      queryClient.invalidateQueries({ queryKey: ["languagesByUserId"] });
    },
    onError: (error) => {
      toast.error("Failed to update language");
      console.error("Failed to update language:", error);
    },
  });
  return { editLanguageDataById, isLoading: isPending };
}
