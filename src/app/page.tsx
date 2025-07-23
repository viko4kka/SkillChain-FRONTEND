"use client";

import { redirect } from "next/navigation";
import AddProject from "@/components/AddProject";
import ProjectList from "@/components/ProjectList";
import axios from "axios";
import { useEffect, useState } from "react";

const api = axios.create({
  baseURL: "http://localhost:3001/",
});

export default function Page() {
  redirect("/search");
  
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    api.get("/projects/user/1").then((response) => {
      setProjects(response.data); // zakładam, że response.data to tablica projektów
      console.log(response.data);
    });
  }, []);

  return (
    <div>
      Hello, World!
      <AddProject />
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="mb-4 text-2xl font-bold">Moje projekty</h1>
        <ProjectList />
      </div>
    </div>
  );
}
