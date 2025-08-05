"use client";

import UserCard from "@/components/UserCard";
import { DisplayUser } from "@/hooks/useUsers";
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
        <div>
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
