"use client";

import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import useProjectsByUserId from "@/hooks/useProjectsByUserId";
import WhiteBackgroundFrame from "./WhiteBackgroundFrame";
import ProjectsHeaderList from "./ProjectHeaderList";
import Spinner from "./Spinner";
import { getProjectsByUserId } from "@/lib/getProjectApi";

interface ProjectListProps {
  userId: number;
}

const DEFAULT_PER_PAGE = 3;

const ProjectList: React.FC<ProjectListProps> = ({ userId }) => {
  const [showAll, setShowAll] = useState(false);
  const [allProjects, setAllProjects] = useState<any[] | null>(null);

  const { projects, isLoading, refetch } = useProjectsByUserId(
    userId,
    DEFAULT_PER_PAGE,
    1,
  );

  const handleShowAll = async () => {
    setShowAll(true);
    const all = await getProjectsByUserId(userId, 50, 1);
    setAllProjects(all);
  };

  const handleProjectUpdated = async () => {
    if (showAll) {
      const all = await getProjectsByUserId(userId, 50, 1);
      setAllProjects(all);
    } else {
      if (refetch) refetch();
    }
  };

  const displayedProjects = showAll && allProjects ? allProjects : projects;

  return (
    <WhiteBackgroundFrame>
      <ProjectsHeaderList
        AddProjectProps={{
          onProjectAdded: handleProjectUpdated,
        }}
      />
      {isLoading && !showAll ? (
        <div className="flex h-[300px] w-full items-center justify-center">
          <Spinner />
        </div>
      ) : !displayedProjects || displayedProjects.length === 0 ? (
        <div>Brak projektów.</div>
      ) : (
        <>
          {displayedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onProjectUpdated={handleProjectUpdated}
            />
          ))}
          {!showAll && (
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
