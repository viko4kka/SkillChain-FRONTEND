"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import UserCard from "./UserCard";
import { BsArrowClockwise } from "react-icons/bs";

interface LocationData {
  id: number;
  name?: string;
  city?: string;
  country?: string;
  [key: string]: any; 
}

export default function UserList() {
  const { users, loading, hasMore, error, loadUsers, loadMore, refresh } =
    useUsers();
  const [locations, setLocations] = useState<{ id: number; name: string }[]>(
    [],
  );
  const observer = useRef<IntersectionObserver | null>(null);

  // Load locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://localhost:3001/common/locations");
        if (!response.ok) throw new Error("Failed to fetch locations");
        const data = await response.json();
        console.log("Locations loaded:", data);

        // The actual locations are in data.data
        if (!data.data || !Array.isArray(data.data)) {
          console.error(
            "Expected locations data to be an array, got:",
            data.data,
          );
          return;
        }

        // Map the location data to the format we need with proper typing
        const locationsArray = data.data.map((location: LocationData) => ({
          id: location.id,
          name: location.name || location.city || location.country || "Unknown",
        }));

        console.log("Processed locations array:", locationsArray);
        setLocations(locationsArray);
      } catch (error) {
        console.error("Error loading locations:", error);
      }
    };

    fetchLocations();
  }, []);

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
        },
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore],
  );

  // Load initial users
  useEffect(() => {
    if (users.length === 0 && !loading) {
      loadUsers();
    }
    
  }, []); // Intentionally empty - we only want this to run once on mount

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

  
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  // Get location name from ID
  const getLocationName = useCallback(
    (locationId?: number) => {
      if (!locationId) {
        return "";
      }

      // Direct debugging of location array contents
      console.log(
        "All location IDs:",
        locations.map((loc) => loc.id),
      );

      
      const location = locations.find(
        (loc) =>
          loc.id === locationId ||
          loc.id === Number(locationId) ||
          String(loc.id) === String(locationId),
      );

      // If still not found, try a hardcoded location map as fallback
      if (!location) {
        // Create a manual mapping based on your data
        const locationMap: Record<number, string> = {
          1: "Warsaw",
          2: "Krakow",
          3: "Wrocław",
          4: "Gdańsk",
          5: "Poznań",
          6: "Łódź",
          7: "Katowice",
          8: "Lublin",
          9: "Bydgoszcz",
          10: "Szczecin",
          11: "Rzeszów",
          12: "Toruń",
          13: "Olsztyn",
          14: "Białystok",
        };

        return locationMap[locationId] || "Poland";
      }

      return location.name;
    },
    [locations],
  );

  return (
    <div className="mx-auto max-w-6xl p-6">
    
      <div className="mb-8 flex items-center justify-end">
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex hidden items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <BsArrowClockwise className={`${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-center">
            <div className="text-red-800">
              <p className="font-medium">Error loading users</p>
              <p className="text-sm">{error}</p>
            </div>
            <button
              onClick={handleRefresh}
              className="ml-auto rounded bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* User Grid */}
      <div className="space-y-4">
        {users.map((user, index) => {
          console.log("User before mapping:", user);

          
          const userSkills = user.skills || "";
          console.log("User skills:", userSkills);

          // Add some default skills for testing if none exist
          const displaySkills =
            userSkills.length > 0 ? userSkills : ``;

          // Map each user with enhanced data
          const fullUser = {
            ...user,
            name: `${user.firstName} ${user.lastName}`,
            title: user.job,
            location: user.locationName,
            avatar: user.imgUrl,
            skills: displaySkills, 
          };

          console.log("Full user with skills:", fullUser.skills);

          if (users.length === index + 1) {
            return (
              <div key={user.id} ref={lastUserElementRef}>
                <UserCard user={fullUser} />
              </div>
            );
          } else {
            return (
              <div key={user.id}>
                <UserCard user={fullUser} />
              </div>
            );
          }
        })}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center space-x-2 text-gray-600">
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <span>Loading users...</span>
          </div>
        </div>
      )}

      {/* No More Users */}
      {!hasMore && users.length > 0 && (
        <div className="py-8 text-center">
          <p className="text-gray-500">You&apos;ve seen all available users!</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && users.length === 0 && !error && (
        <div className="py-12 text-center">
          <div className="mb-4 text-gray-400">
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
          <h3 className="mb-2 text-lg font-medium text-gray-900">
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
