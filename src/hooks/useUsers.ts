"use client";

import { useState, useCallback } from "react";
import { User, UsersResponse } from "../types/user";

// API function to fetch users from database
const fetchUsers = async (
  page: number = 1,
  limit: number = 10
): Promise<UsersResponse> => {
  console.log(`Fetching page ${page} with limit ${limit}`);

  try {
    const response = await fetch(`/api/users?page=${page}&limit=${limit}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

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
        const response = await fetchUsers(currentPage, 10);

        if (isLoadMore) {
          setUsers((prev) => [...prev, ...response.users]);
        } else {
          setUsers(response.users);
        }

        setHasMore(response.hasMore);
        setPage(currentPage + 1);
      } catch (err) {
        setError("Failed to load users. Please try again.");
        console.error("Error loading users:", err);
      } finally {
        setLoading(false);
      }
    },
    [loading, page]
  );

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      loadUsers(true);
    }
  }, [hasMore, loading, loadUsers]);

  const refresh = useCallback(() => {
    setPage(1);
    setUsers([]);
    setHasMore(true);
    // Don't call loadUsers here to avoid dependency cycle
  }, []);

  return {
    users,
    loading,
    hasMore,
    error,
    loadUsers,
    loadMore,
    refresh,
  };
};
