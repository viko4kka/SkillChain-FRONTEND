import { DisplayUser } from "@/hooks/useUsers";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;

export async function getUsers(
  searchQuery: string,
  skillId: number | null,
  languageId: number | null,
  locationId: number | null,
): Promise<DisplayUser[]> {
  const params = new URLSearchParams();

  if (searchQuery && searchQuery.trim() !== "") {
    params.append("search", searchQuery);
  }
  if (skillId) {
    params.append("skillId", skillId.toString());
  }
  if (languageId) {
    params.append("languageId", languageId.toString());
  }
  if (locationId) {
    params.append("locationId", locationId.toString());
  }
  const url = `${API_DOMAIN}/users?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data: DisplayUser[] = await response.json();

  return data;
}

export async function getAllLocationsApi() {
  const response = await fetch(
    `${API_DOMAIN}/common/locations?perPage=50&page=1`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch locations");
  }

  const data = await response.json();
  return data;
}
