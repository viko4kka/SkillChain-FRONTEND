"use client";

import React from "react";
import ProjectCard from "./ProjectCard";
import useProjectsByUserId from "@/hooks/useProjectsByUserId";
import WhiteBackgroundFrame from "./WhiteBackgroundFrame";
import ProjectsHeaderList from "./ProjectHeaderList";

interface ProjectListProps {
  userId: number;
}

const ProjectList: React.FC<ProjectListProps> = ({ userId }) => {
  const { projects, isLoading } = useProjectsByUserId(userId);

  if (isLoading) return <div>Ładowanie projektów...</div>;
  if (!projects || projects.length === 0) return <div>Brak projektów.</div>;

  return (
    <WhiteBackgroundFrame>
      <ProjectsHeaderList />
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </WhiteBackgroundFrame>
  );
};

export default ProjectList;
