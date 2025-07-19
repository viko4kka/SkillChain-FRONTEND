import { editUserDataById as editUserDataByIdApi } from "@/lib/getUserApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUserUpdateDataById() {
  const queryClient = useQueryClient();

  const { mutate: editUserDataById, isPending } = useMutation({
    mutationFn: async (editUserData: {
      id: number;
      updatedData: {
        description?: string;
        job?: string;
        gitUrl?: string;
        linkedinUrl?: string;
      };
    }) => {
   
      const result = await editUserDataByIdApi(editUserData);
      return result;
    },
    onSuccess: () => {
      toast.success("Your data updated successfully");
      queryClient.invalidateQueries({ queryKey: ["userDataById"] });
    },
    onError: (error) => {
      toast.error("Failed to update your data");
      console.error("Failed to update user:", error);
    },
  });

  return { editUserDataById, isLoading: isPending };
}
