"use client";

import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import useProjectsByUserId from "@/hooks/useProjectsByUserId";
import WhiteBackgroundFrame from "../WhiteBackgroundFrame";
import ProjectsHeaderList from "./ProjectHeaderList";
import Spinner from "../Spinner";
import { useStore } from "@/stores/useStore";
import { FiFolder } from "react-icons/fi";

interface ProjectListProps {
  userId: number;
}

const DEFAULT_PER_PAGE = 3;
const SHOW_ALL_PER_PAGE = 50;

const ProjectList: React.FC<ProjectListProps> = ({ userId }) => {
  const { isAuthenticated, user } = useStore();
  const canEdit = isAuthenticated && user?.id === userId;

  const [showAll, setShowAll] = useState(false);
  const { data, isLoading, refetch } = useProjectsByUserId(
    userId,
    showAll ? SHOW_ALL_PER_PAGE : DEFAULT_PER_PAGE,
    1,
  );
  const handleShowAll = async () => {
    setShowAll((prev) => !prev);
  };

  const handleProjectUpdated = () => {
    refetch();
  };

  return (
    <WhiteBackgroundFrame>
      <ProjectsHeaderList
        AddProjectProps={{
          onProjectAdded: handleProjectUpdated,
        }}
        canEdit={canEdit}
      />
      {isLoading && !showAll && (
        <div className="flex h-[300px] w-full items-center justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && (!data || data.itemsCount === 0) && (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-gray-500">
          <FiFolder className="mb-2 text-4xl text-mainBlue" />
          <span className="text-lg font-medium">No projects found</span>
          <span className="text-sm text-gray-400">
            Add your first project using the <b>+</b> button above!
          </span>
        </div>
      )}
      {!isLoading && data && data.itemsCount > 0 && (
        <>
          {data.projects?.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onProjectUpdated={handleProjectUpdated}
              canEdit={canEdit}
            />
          ))}
          {data.itemsCount > 3 && !showAll && (
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
