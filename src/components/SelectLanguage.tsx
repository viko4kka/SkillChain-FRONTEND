"use client";

import useAllLanguages from "@/hooks/useAllLanguages";
import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface SelectLanguageProps {
  onSelect?: (id: number) => void;
}

export default function SelectLanguage({ onSelect }: SelectLanguageProps) {
  const { languages, isLoading } = useAllLanguages();
  const [selectedId, setSelectedId] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(event.target.value);
    setSelectedId(id);
    onSelect?.(id);
  };

  return (
    <div className="flex w-full flex-col items-start gap-y-2 md:justify-between">
      <label className="text-dark-text group-focus-within:text-mainBlue mb-1 text-sm transition-colors duration-300">
        Language
      </label>
      <div className="relative w-full">
        <select
          className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-500 focus:border-gray-400 focus:outline-none"
          value={selectedId}
          onChange={handleChange}
        >
          <option value="">All languages</option>
          {isLoading ? (
            <option disabled>Ładowanie...</option>
          ) : (
            languages?.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))
          )}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <FiChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
}
