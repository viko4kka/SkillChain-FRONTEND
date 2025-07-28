"use client";

import React from "react";
import ProjectCard from "./ProjectCard";
import useProjectsByUserId from "@/hooks/useProjectsByUserId";
import WhiteBackgroundFrame from "./WhiteBackgroundFrame";
import ProjectsHeaderList from "./ProjectHeaderList";
import Spinner from "./Spinner";

interface ProjectListProps {
  userId: number;
}

const ProjectList: React.FC<ProjectListProps> = ({ userId }) => {
  const { projects, isLoading } = useProjectsByUserId(userId);
  return (
    <WhiteBackgroundFrame>
      <ProjectsHeaderList />
      {isLoading ? (
        <div className="flex h-[300px] w-full items-center justify-center">
          <Spinner />
        </div>
      ) : !projects || projects.length === 0 ? (
        <div>Brak projektów.</div>
      ) : (
        projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))
      )}
    </WhiteBackgroundFrame>
  );
};

export default ProjectList;
