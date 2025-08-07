"use client";

import { User } from "@/components/userProfile/UserFrameInProfilePage";
import { getSkillsByUserId } from "@/lib/getSkillApi";
import { Skill } from "@/types";
import { useQuery } from "@tanstack/react-query";

export interface Approver extends User {
  id: number;
  firstName: string;
  lastName: string;
}

export interface SkillWithConfirmations extends Skill {
  userId?: number;
  confirmations?: Approver[];
}

export default function useConfirmations(userId?: number) {
  const { data, isLoading } = useQuery({
    queryKey: ["confirmations", userId],
    queryFn: () => getSkillsByUserId(userId!),
    enabled: !!userId,
  });

  const confirmations =
    data?.flatMap(
      (skill: SkillWithConfirmations) => skill.confirmations ?? [],
    ) ?? [];

  return { confirmations, isLoading };
}
