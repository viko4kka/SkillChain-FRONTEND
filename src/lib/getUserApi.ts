"use client";

import { User } from "@/components/userProfile/UserFrameInProfilePage";

interface UserUpdateData {
  id: number;
  updatedData: {
    description?: string;
    job?: string;
    gitUrl?: string;
    linkedinUrl?: string;
    locationId?: number | null;
  };
}

export async function getUserById(
  id: number | undefined,
): Promise<User | undefined> {
  try {
    const response = await fetch(`http://localhost:3001/users/${id}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function editUserDataById({
  id,
  updatedData,
}: UserUpdateData): Promise<User | undefined> {
  const updateUserOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description: updatedData.description || null,
      job: updatedData.job || null,
      gitUrl: updatedData.gitUrl || null,
      linkedinUrl: updatedData.linkedinUrl || null,
      locationId: updatedData.locationId || null,
    }),
  };

  try {
    const response = await fetch(
      `http://localhost:3001/users/${id}/profile`,
      updateUserOptions,
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchMe(): Promise<User> {
  const res = await fetch("http://localhost:3001/auth/me", {
    credentials: "include",
  });

  if (!res.ok) {
    if (res.status === 403) {
      throw new Error("Unauthorized");
    }
    throw new Error("Network response was not ok");
  }

  return await res.json();
}

export async function logOut() {
  const response = await fetch("http://localhost:3001/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }

  return response.json();
}
