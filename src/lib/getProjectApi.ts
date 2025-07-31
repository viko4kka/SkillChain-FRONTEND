"use client";
const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;

import { AddProject, Project } from "@/types";

export async function getProjectsByUserId(
  userId: number,
  perPage: number,
  page: number,
): Promise<Project[]> {
  try {
    const response = await fetch(
      `${API_DOMAIN}/projects/user/${userId}?perPage=${perPage}&page=${page}`,
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function postProject(
  project: AddProject,
): Promise<AddProject | null> {
  try {
    const response = await fetch(`${API_DOMAIN}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while adding project:", error);
    return null;
  }
}

export async function editProjectById(
  id: number,
  updatedData: Partial<AddProject>,
): Promise<Project | null> {
  try {
    const response = await fetch(`${API_DOMAIN}/projects/${id}`, {
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
    console.error("Error while editing project:", error);
    return null;
  }
}

export async function deleteProjectById(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_DOMAIN}/projects/${id}`, {
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
