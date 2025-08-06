import { deleteLanguageById } from "@/lib/getLanguageApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useLanguageDelete() {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteLanguage, isPending: isLoading } = useMutation({
    mutationFn: async (id: number) => {
      return await deleteLanguageById(id);
    },
    onSuccess: () => {
      toast.success("Language deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["languagesByUserId"] });
    },
    onError: (error) => {
      toast.error("Failed to delete language");
      console.error("Failed to delete language:", error);
    },
  });

  return { deleteLanguage, isLoading };
}
