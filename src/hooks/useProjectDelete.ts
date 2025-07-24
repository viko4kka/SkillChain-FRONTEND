import { useState } from "react";
import { deleteProjectById } from "@/lib/getProjectApi";

export function useProjectDelete() {
  const [isLoading, setIsLoading] = useState(false);

  async function deleteProject(id: number): Promise<boolean> {
    setIsLoading(true);
    try {
      const result = await deleteProjectById(id);
      return result;
    } finally {
      setIsLoading(false);
    }
  }

  return { deleteProject, isLoading };
}
