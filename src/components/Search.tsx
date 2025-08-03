"use client";

import useDebounce from "@/hooks/useDebounce";
import useUsers from "@/hooks/useUsers";
import { useState } from "react";
import SearchFrame from "./SearchFrame";
import WhiteBackgroundFrame from "./WhiteBackgroundFrame";
import UsersList from "./UsersList";

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

  //correct design spinner and error handling here

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

        <div className="p-4">
          {isLoading && <div>Loading users...</div>}
          {error && <div>Error loading users: {error.message}</div>}
          {users && <UsersList users={users} />}
        </div>
      </div>
    </div>
  );
}
