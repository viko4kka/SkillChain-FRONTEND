"use client";

import useDebounce from "@/hooks/useDebounce";
import useUsers from "@/hooks/useUsers";
import { useState } from "react";
import SearchFrame from "./SearchFrame";
import Spinner from "./Spinner";
import WhiteBackgroundFrame from "./WhiteBackgroundFrame";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce({ value: searchQuery, delay: 500 });
  const [filters, setFilters] = useState<{
    skillId: number | null;
    languageId: number | null;
    locationId: number | null;
  }>({
    skillId: null,
    languageId: null,
    locationId: null,
  });

  const { users, isLoading, error } = useUsers(
    debouncedQuery,
    filters.skillId,
    filters.languageId,
    filters.locationId,
  );

  return (
    <div className="flex h-screen flex-col items-center justify-start">
      <div className="mt-[40px] w-full max-w-4xl px-4">
        <WhiteBackgroundFrame>
          <SearchFrame
            onSearchChange={setSearchQuery}
            searchQuery={searchQuery}
            filters={filters}
            setFilters={setFilters}
          />
        </WhiteBackgroundFrame>

        <div className="items-center justify-center p-4">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Spinner />
              <p className="mt-4 text-sm text-gray-600">Loading users...</p>
            </div>
          )}
          {error && <div>Error loading users: {error.message}</div>}
          {/* #TODO  https://trello.com/c/ilLYxSPN/22-fe-add-users-list */}
          {users && users.length > 0 && (
            <span className="text-gray-600">
              Found {users.length} user{users.length > 1 ? "s" : ""}:
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
