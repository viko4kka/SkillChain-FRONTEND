import { User } from "@/components/UserFrameInProfilePage";

export async function getUsers(): Promise<User[]> {
  const response = await fetch("http://localhost:3001/users");

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data: User[] = await response.json();
  return data;
}

export async function searchUsers(searchQuery: string): Promise<User[]> {
  const url = `http://localhost:3001/users?search=${encodeURIComponent(searchQuery)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }

  const data: User[] = await response.json();

  return data;
}
