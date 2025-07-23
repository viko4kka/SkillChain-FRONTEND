"use client";

import { Project } from "@/types";

export async function getProjectsByUserId(userId: number): Promise<Project[]> {
  try {
    const response = await fetch(
      `http://localhost:3001/projects/user/${userId}`,
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
