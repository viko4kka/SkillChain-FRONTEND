"use client";

import { useState, useCallback } from "react";

export interface User {
  id: number;
  linkedInId?: string;
  firstName: string;
  lastName: string;
  description?: string;
  job?: string;
  gitUrl?: string;
  linkedinUrl?: string;
  email: string;
  imgUrl?: string;
  locationId?: number;
  skills?: string;
  locationName?: string; // Added for UserList
  // Add other user fields as needed
}

export interface UsersResponse {
  users: User[];
  hasMore: boolean; // Add this to match the implementation
}

// Updated API function with proper error handling
export async function fetchUsers(page = 1, limit = 10): Promise<UsersResponse> {
  try {
    // Use the same pattern as locations - without query parameters
    const response = await fetch(`http://localhost:3001/users`);

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Raw users response:", data);

    // Handle pagination in the client
    let allUsers: User[] = [];

    if (Array.isArray(data)) {
      allUsers = data;
    } else if (data && typeof data === "object") {
      allUsers = data.users || data || [];
    }

    // Always do client-side pagination to ensure consistency
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = allUsers.slice(startIndex, endIndex);
    const hasMore = endIndex < allUsers.length;

    console.log("Client-side pagination:", {
      total: allUsers.length,
      page,
      limit,
      showing: paginatedUsers.length,
      hasMore,
    });

    return { users: paginatedUsers, hasMore };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [], hasMore: false };
  }
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(
    async (isLoadMore = false) => {
      if (loading) return;

      setLoading(true);
      setError(null);

      try {
        const currentPage = isLoadMore ? page : 1;
        // Set limit to 10 for initial load
        const response = await fetchUsers(currentPage, 10);

        if (!isLoadMore) {
          setUsers(response.users);
        } else {
          setUsers((prevUsers) => [...prevUsers, ...response.users]);
        }

        setHasMore(response.hasMore);

        if (isLoadMore) {
          setPage((prevPage) => prevPage + 1);
        } else {
          setPage(2); // Next page will be 2 after initial load
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    },
    [loading, page],
  );

  const loadMore = useCallback(() => {
    loadUsers(true);
  }, [loadUsers]);

  const refresh = useCallback(() => {
    setPage(1);
    setUsers([]);
    setHasMore(true);
  }, []);

  return { users, loading, hasMore, error, loadUsers, loadMore, refresh };
};
