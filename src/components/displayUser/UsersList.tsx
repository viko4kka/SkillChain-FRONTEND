"use client";

import { DisplayUser } from "@/hooks/useUsers";
import UserCard from "./UserCard";

interface UsersListProps {
  users: DisplayUser[];
}

export default function UsersList({ users }: UsersListProps) {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-6 text-sm text-gray-600">
        {users.length} {users.length === 1 ? "person" : "people"} found
      </div>

      {users.length > 0 ? (
        <div className="space-y-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            No users found
          </h3>
          <p className="max-w-md text-sm text-gray-600">
            We couldn&apos;t find any users matching your search criteria. Try
            adjusting your filters or search terms.
          </p>
        </div>
      )}
    </div>
  );
}
