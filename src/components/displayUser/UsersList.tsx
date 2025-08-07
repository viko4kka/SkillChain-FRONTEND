"use client";

import { DisplayUser } from "@/hooks/useUsers";
import UserCard from "./UserCard";
interface UsersListProps {
  users: DisplayUser[];
}
export default function UsersList({ users }: UsersListProps) {
  return (
    <div>
      <div className="mb-4 text-sm text-gray-600">
        {users.length} {users.length === 1 ? "person" : "people"} found
      </div>

      {users.length > 0 ? (
        <div className="flex flex-col items-center gap-y-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h3 className="text-dark-text mb-2 text-lg font-semibold">
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
