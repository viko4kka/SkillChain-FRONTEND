"use client";

import { AddProject, Project } from "@/types";

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

export async function postProject(
  project: AddProject,
): Promise<AddProject | null> {
  try {
    const response = await fetch("http://localhost:3001/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Błąd podczas dodawania projektu:", error);
    return null;
  }
}

export async function editProjectById(
  id: number,
  updatedData: Partial<AddProject>,
): Promise<Project | null> {
  try {
    const response = await fetch(`http://localhost:3001/projects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Błąd podczas edytowania projektu:", error);
    return null;
  }
}
