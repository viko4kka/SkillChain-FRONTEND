"use client";

import { User } from "@/components/UserFrameInProfilePage";

interface UserUpdateData {
  id: number;
  updatedData: {
    description?: string;
    job?: string;
    gitUrl?: string;
    linkedinUrl?: string;
  };
}

export async function getUserById(id: number): Promise<User | undefined> {
  try {
    const response = await fetch(`http://localhost:3001/users/${id}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("lipa", error);
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
