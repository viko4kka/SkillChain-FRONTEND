import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { Project } from "../types";
import EditProjectForm from "./EditProjectForm";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditClick = () => setIsEditOpen(true);

  return (
    <div className="w-full border-b border-gray-200 p-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">{project.projectName}</h2>
        <FiEdit2
          className="cursor-pointer text-blue-600"
          onClick={handleEditClick}
        />
      </div>
      <p className="mt-1 text-sm text-gray-500">{project.description}</p>
      <div className="mt-2 flex flex-col gap-1 text-sm text-blue-600">
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {project.githubLink}
        </a>
        <a
          href={project.websiteLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {project.websiteLink}
        </a>
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 sm:px-6">
          <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <EditProjectForm
              initialData={project}
              onCloseModal={() => setIsEditOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
