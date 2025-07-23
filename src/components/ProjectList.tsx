import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import { Project } from "../types";

const api = axios.create({
  baseURL: "http://localhost:3001/",
});

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get<Project[]>("/projects/user/1");
        setProjects(res.data);
      } catch (err) {
        console.error("Błąd przy pobieraniu projektów:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div>Ładowanie projektów...</div>;
  if (projects.length === 0) return <div>Brak projektów.</div>;

  return (
    <div className="flex flex-col gap-4 p-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
