"use client";

import { AddSkillInput, EditSkill, Skill } from "@/types";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;

export async function getAllSkillsApi() {
  const response = await fetch(`${API_DOMAIN}/common/skills?perPage=50&page=1`);

  if (!response.ok) {
    throw new Error("Failed to fetch skills");
  }

  const data = await response.json();
  return data.data;
}

export async function getSkillsByUserId(userId: number): Promise<Skill[]> {
  try {
    const response = await fetch(`${API_DOMAIN}/skills/user/${userId}`, {
      method: "GET",
    });
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

export async function postSkill(
  skill: AddSkillInput,
): Promise<AddSkillInput | null> {
  try {
    const response = await fetch(`${API_DOMAIN}/skills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(skill),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while adding skill:", error);
    return null;
  }
}

export async function editSkillById(
  id: number,
  updatedData: Partial<EditSkill>,
): Promise<Skill | null> {
  try {
    const response = await fetch(`${API_DOMAIN}/skills/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while editing skill:", error);
    return null;
  }
}

export async function deleteSkillById(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_DOMAIN}/skills/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error while deleting project:", error);
    return false;
  }
}
