import React, { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import axios from "axios";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
}

const api = axios.create({
  baseURL: "http://localhost:3001/",
});

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { projectName, description, githubLink, websiteLink } = project;

  return (
    <div className="p-4 border-b border-gray-200 max-w-xl">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">{projectName}</h2>
        <FiEdit2 className="text-blue-600 cursor-pointer" />
      </div>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
      <div className="flex flex-col gap-1 mt-2 text-sm text-blue-600">
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
