"use client";

import React, { useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import WhiteBackgroundFrame from "./WhiteBackgroundFrame";
import ProjectsHeaderList from "./ProjectHeaderList";
import Spinner from "./Spinner";
import { getProjectsByUserId } from "@/lib/getProjectApi";
import { Project } from "@/types";

interface ProjectListProps {
  userId: number;
}

const PER_PAGE = 2;

const ProjectList: React.FC<ProjectListProps> = ({ userId }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setProjects([]);
    setPage(1);
    setHasMore(true);
  }, [userId]);

  useEffect(() => {
    if (!hasMore) return;
    const fetchProjects = async () => {
      setIsLoading(true);
      const newProjects = await getProjectsByUserId(userId, PER_PAGE, page);
      if (newProjects.length < PER_PAGE) setHasMore(false);
      setProjects((prev) => [...prev, ...newProjects]);
      setIsLoading(false);
    };
    fetchProjects();
  }, [page, userId, hasMore]);

  useEffect(() => {
    if (!hasMore || isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 },
    );
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [hasMore, isLoading]);

  return (
    <WhiteBackgroundFrame>
      <ProjectsHeaderList />
      {isLoading && projects.length === 0 ? (
        <div className="flex h-[100px] w-full items-center justify-center">
          <Spinner />
        </div>
      ) : projects.length === 0 ? (
        <div>Brak projektów.</div>
      ) : (
        <div className="max-h-[500px] w-full overflow-y-auto">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <div ref={loader} />
          {isLoading && (
            <div className="flex h-[100px] w-full items-center justify-center">
              <Spinner />
            </div>
          )}
        </div>
      )}
    </WhiteBackgroundFrame>
  );
};

export default ProjectList;
