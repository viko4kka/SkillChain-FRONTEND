"use client";

import { User } from "@/components/UserFrameInProfilePage";
import { getUsers } from "@/lib/getSearchApi";

import { useQuery } from "@tanstack/react-query";

type UserSkillType = {
  id: number;
  name: string;
};

type UserLanguageType = {
  id: number;
  name: string;
};

type UserLocationType = {
  id: number;
  name: string;
};

export interface DisplayUser extends User {
  userSkills: UserSkillType[];
  location: UserLocationType;
  userLanguages: UserLanguageType[];
}

export default function useUsers(
  debouncedSearchQuery: string,
  skillId: number | null,
  languageId: number | null,
  locationId: number | null,
) {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<DisplayUser[]>({
    queryKey: ["users", debouncedSearchQuery, skillId, languageId, locationId],
    queryFn: () =>
      getUsers(debouncedSearchQuery, skillId, languageId, locationId),
  });

  return { users, isLoading, error };
}
