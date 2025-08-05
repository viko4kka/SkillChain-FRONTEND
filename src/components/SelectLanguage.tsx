"use client";
import React from "react";
import useAllLanguages from "@/hooks/useAllLanguages";

export default function Select() {
  const { languages, isLoading } = useAllLanguages();

  return (
    <div className="flex w-full flex-col items-start gap-y-2 md:justify-between">
      <label className="text-sm text-gray-700">Skills</label>
      <div className="relative w-full">
        <select
          className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-500 focus:border-gray-400 focus:outline-none"
          defaultValue=""
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
          <svg
            className="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 8l4 4 4-4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
