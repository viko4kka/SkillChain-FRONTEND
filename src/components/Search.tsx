"use client";

import useDebounce from "@/hooks/useDebounce";
import useSearch from "@/hooks/useSearch";
import useUsers from "@/hooks/useUsers";
import React, { useState } from "react";
import UserCard from "./UserCard";
import SearchFrame from "./SearchFrame";
import WhiteBackgroundFrame from "./WhiteBackgroundFrame";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce({ value: searchQuery, delay: 500 });

  const {
    searchResult,
    isLoading: isLoadingSearch,
    error: errorSearch,
  } = useSearch(debouncedQuery);
  const { users, isLoading: isLoadingAll, error: errorAll } = useUsers();

  const isSearchingActive = debouncedQuery.length > 0;
  const dataToShow = isSearchingActive ? searchResult : users;
  const isLoading = isSearchingActive ? isLoadingSearch : isLoadingAll;
  const error = isSearchingActive ? errorSearch : errorAll;

  return (
    <div className="flex h-screen flex-col items-center justify-start">
      <div className="mt-[40px] w-full max-w-4xl px-4">
        <WhiteBackgroundFrame>
          <SearchFrame onSearchChange={setSearchQuery} />
        </WhiteBackgroundFrame>

        <div className="mt-6 w-full">
          {isLoading && (
            <div className="py-4 text-center">
              <p>Loading...</p>
            </div>
          )}

          {error && (
            <div className="py-4 text-center text-red-500">
              <p>Error loading users</p>
            </div>
          )}

          {!isLoading && !error && (
            <div className="space-y-4">
              {dataToShow?.map((user) => (
                <WhiteBackgroundFrame key={user.id}>
                  <div className="p-4">
                    <UserCard
                      firstName={user.firstName}
                      lastName={user.lastName}
                    />
                  </div>
                </WhiteBackgroundFrame>
              ))}
            </div>
          )}

          {!isLoading &&
            !error &&
            dataToShow?.length === 0 &&
            isSearchingActive && (
              <div className="py-4 text-center">
                <p>not found users</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Search;
