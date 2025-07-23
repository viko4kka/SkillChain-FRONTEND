"use client";

import { useEffect, useRef, useCallback } from "react";
import { useUsers } from "@/hooks/useUsers";
import UserCard from "./UserCard";
import { BsArrowClockwise } from "react-icons/bs";

export default function UserList() {
  const { users, loading, hasMore, error, loadUsers, loadMore, refresh } =
    useUsers();
  const observer = useRef<IntersectionObserver | null>(null);

  // Ref for the last user element to trigger infinite scroll
  const lastUserElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !loading) {
            loadMore();
          }
        },
        {
          threshold: 0.1,
          rootMargin: "100px",
        }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  // Load initial users
  useEffect(() => {
    if (users.length === 0) {
      loadUsers();
    }
  }, [users.length, loadUsers]);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    refresh();
    setTimeout(() => {
      loadUsers();
    }, 100);
  }, [refresh, loadUsers]);

  // Debug info
  useEffect(() => {
    console.log("UserList debug:", {
      usersLength: users.length,
      loading,
      hasMore,
      error,
    });
  }, [users.length, loading, hasMore, error]);

  // Cleanup intersection observer
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Discover Talent</h1>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="hidden flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <BsArrowClockwise className={`${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <div className="text-red-800">
              <p className="font-medium">Error loading users</p>
              <p className="text-sm">{error}</p>
            </div>
            <button
              onClick={handleRefresh}
              className="ml-auto px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* User Grid */}
      <div className="space-y-4">
        {users.map((user, index) => {
          // Add ref to the last user for infinite scroll
          if (users.length === index + 1) {
            return (
              <div key={user.id} ref={lastUserElementRef}>
                <UserCard user={user} />
              </div>
            );
          } else {
            return (
              <div key={user.id}>
                <UserCard user={user} />
              </div>
            );
          }
        })}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="flex items-center space-x-2 text-gray-600">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span>Loading users...</span>
          </div>
        </div>
      )}

      {/* No More Users */}
      {!hasMore && users.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">You&apos;ve seen all available users!</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && users.length === 0 && !error && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No users found
          </h3>
          <p className="text-gray-500">
            There are no users to display at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
