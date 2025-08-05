"use client";

import { AddLanguageInput, EditLanguage, Language } from "@/types";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;

export async function getAllLanguagesApi() {
  const response = await fetch(
    `${API_DOMAIN}/common/languages?perPage=50&page=1`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch languages");
  }

  const data = await response.json();
  return data.data;
}

export async function getLanguagesByUserId(
  userId: number,
): Promise<Language[]> {
  try {
    const response = await fetch(`${API_DOMAIN}/languages/user/${userId}`, {
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

export async function postLanguage(
  language: AddLanguageInput,
): Promise<AddLanguageInput | null> {
  try {
    const response = await fetch(`${API_DOMAIN}/languages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(language),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while adding language:", error);
    return null;
  }
}

export async function editLanguageById(
  id: number,
  updatedData: Partial<EditLanguage>,
): Promise<Language | null> {
  try {
    const response = await fetch(`${API_DOMAIN}/languages/${id}`, {
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
    console.error("Error while editing language:", error);
    return null;
  }
}
