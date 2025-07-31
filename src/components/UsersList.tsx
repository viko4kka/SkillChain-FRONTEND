"use client";

import useUsers from "@/hooks/useUsers";
import UserCard from "@/components/UserCard";

export default function UsersList() {
  const { users, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div>
      {users?.map((user) => (
        <UserCard
          key={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
        />
      ))}
    </div>
  );
}
