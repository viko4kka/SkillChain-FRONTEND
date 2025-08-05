"use client";

import UserCard from "@/components/UserCard";
import { DisplayUser } from "@/hooks/useUsers";

interface UsersListProps {
  users: DisplayUser[];
}

export default function UsersList({ users }: UsersListProps) {
  return (
    <ul>
      {users?.map((user) => (
        <li key={user.id}>
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  );
}
