import { DisplayUser } from "@/hooks/useUsers";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;

export async function getUsers(
  searchQuery: string,
  skillId: number | null,
  languageId: number | null,
  locationId: number | null,
): Promise<DisplayUser[]> {
  let url = `${API_DOMAIN}/users?`;

  if (searchQuery && searchQuery.trim() !== "") {
    url += `search=${encodeURIComponent(searchQuery)}&`;
  }

  if (skillId) {
    url += `skillId=${skillId}&`;
  }

  if (languageId) {
    url += `languageId=${languageId}&`;
  }

  if (locationId) {
    url += `locationId=${locationId}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data: DisplayUser[] = await response.json();

  return data;
}

//  This API has pagination, but it shouldn't — we need all skills at once for a select dropdown.
// For now, I hardcoded `perPage=50&page=1` to fetch everything, assuming the skill list won’t grow in the future.
export async function getAllSkillsApi() {
  const response = await fetch(`${API_DOMAIN}/common/skills?perPage=50&page=1`);

  if (!response.ok) {
    throw new Error("Failed to fetch skills");
  }

  const data = await response.json();
  return data;
}

export async function getAllLanguagesApi() {
  const response = await fetch(
    `${API_DOMAIN}/common/languages?perPage=50&page=1`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch languages");
  }

  const data = await response.json();
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
