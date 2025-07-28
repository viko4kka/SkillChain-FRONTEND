import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { Project } from "../types";
import EditProjectForm from "./EditProjectForm";
import { BiLinkExternal } from "react-icons/bi";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditClick = () => setIsEditOpen(true);

  return (
    <div className=":px-15 w-full border-b border-gray-200 px-4 py-5 sm:px-10 lg:px-15">
      <div className="flex items-center gap-2">
        <h2 className="text-dark-text font-semibold">{project.projectName}</h2>
        <FiEdit2
          className="cursor-pointer text-blue-600"
          onClick={handleEditClick}
        />
      </div>
      <p className="text-dark-text mt-1 text-sm">{project.description}</p>
      <div className="mt-2 flex flex-row gap-4 text-sm text-blue-600">
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:underline"
          title={project.githubLink || ""}
        >
          GitHub <BiLinkExternal size={16} />
        </a>
        <a
          href={project.websiteLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:underline"
          title={project.websiteLink || ""}
        >
          {project.websiteLink
            ? project.websiteLink
                .replace(/^https?:\/\/(www\.)?/, "")
                .split("/")[0]
            : ""}
          <BiLinkExternal size={16} />
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
