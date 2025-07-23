import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { projectName, description, githubLink, websiteLink } = project;

  return (
    <div className="w-full border-b border-gray-200 p-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">{projectName}</h2>
        <FiEdit2 className="cursor-pointer text-blue-600" />
      </div>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="mt-2 flex flex-col gap-1 text-sm text-blue-600">
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {githubLink}
        </a>
        <a
          href={websiteLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {websiteLink}
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
