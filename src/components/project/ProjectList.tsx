"use client";

import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import useProjectsByUserId from "@/hooks/useProjectsByUserId";
import WhiteBackgroundFrame from "../WhiteBackgroundFrame";
import ProjectsHeaderList from "./ProjectHeaderList";
import Spinner from "../Spinner";

interface ProjectListProps {
  userId: number;
}

const DEFAULT_PER_PAGE = 3;
const SHOW_ALL_PER_PAGE = 50;

const ProjectList: React.FC<ProjectListProps> = ({ userId }) => {
  const [pagination, setPagination] = useState({
    all: false,
    perPage: DEFAULT_PER_PAGE,
  });
  const { projects, isLoading, refetch } = useProjectsByUserId(
    userId,
    pagination.perPage,
    1,
  );
  const handleShowAll = async () => {
    setPagination((prev) => ({
      all: !prev.all,
      perPage: prev.all ? DEFAULT_PER_PAGE : SHOW_ALL_PER_PAGE,
    }));
  };
  React.useEffect(() => {
    refetch();
  }, [pagination.all]);

  const handleProjectUpdated = () => {
    refetch();
  };

  return (
    <WhiteBackgroundFrame>
      <ProjectsHeaderList
        AddProjectProps={{
          onProjectAdded: handleProjectUpdated,
        }}
      />
      {isLoading && !pagination.all && (
        <div className="flex h-[300px] w-full items-center justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && (!projects || projects.length === 0) && (
        <div>No projects found.</div>
      )}
      {!isLoading && projects && projects.length > 0 && (
        <>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onProjectUpdated={handleProjectUpdated}
            />
          ))}
          {!pagination.all && (
            <div className="my-4 flex justify-center">
              <button
                className="text-mainBlue cursor-pointer text-sm font-bold sm:text-base"
                onClick={handleShowAll}
              >
                Show all projects
              </button>
            </div>
          )}
        </>
      )}
    </WhiteBackgroundFrame>
  );
};

export default ProjectList;
