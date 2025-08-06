import React from "react";

import { useAllSkills } from "@/hooks/useAllSkills";

import { useAllLanguages } from "@/hooks/useAllLanguages";
import { useAllLocations } from "@/hooks/useAllLocations";
import Spinner from "../Spinner";
import Select from "./Select";

interface FilterPanelProps {
  filters: {
    skillId: number | null;
    languageId: number | null;
    locationId: number | null;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      skillId: number | null;
      languageId: number | null;
      locationId: number | null;
    }>
  >;
}

export default function FilterPanel({ filters, setFilters }: FilterPanelProps) {
  const { allSkills, isLoading: isLoadingSkills } = useAllSkills();
  const { allLanguages, isLoading: isLoadingLanguages } = useAllLanguages();
  const { allLocations, isLoading: isLoadingLocations } = useAllLocations();

  if (isLoadingSkills || isLoadingLanguages || isLoadingLocations) {
    return <Spinner />;
  }

  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-y-2 md:flex-row md:items-center md:gap-x-4">
      <Select
        label="Skills"
        value={filters.skillId}
        onChange={(value) =>
          setFilters((prev) => ({ ...prev, skillId: value }))
        }
        options={allSkills?.data.map((skill) => ({
          id: skill.id,
          label: skill.name,
        }))}
        placeholder="Choose skill"
      />
      <Select
        label="Languages"
        value={filters.languageId}
        onChange={(value) =>
          setFilters((prev) => ({ ...prev, languageId: value }))
        }
        options={allLanguages?.data.map((language) => ({
          id: language.id,
          label: language.name,
        }))}
        placeholder="Choose language"
      />
      <Select
        label="Location"
        value={filters.locationId}
        onChange={(value) =>
          setFilters((prev) => ({ ...prev, locationId: value }))
        }
        options={allLocations?.data.map((location) => ({
          id: location.id,
          label: location.name,
        }))}
        placeholder="Choose location"
      />
    </div>
  );
}
