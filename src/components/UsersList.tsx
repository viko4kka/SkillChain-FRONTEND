"use client";

import UserCard from "@/components/UserCard";
import { DisplayUser } from "@/hooks/useUsers";

interface UsersListProps {
  users: DisplayUser[];
}

export default function UsersList({ users }: UsersListProps) {
  return (
    <div>
      {users?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
