"use client";
import { useState } from "react";
import AddProjectModal from "@/components/AddProjectModal";
import { FiPlus } from "react-icons/fi";
import useProjectPost from "@/hooks/useProjectPost";

export default function AddProject({
  onProjectAdded,
}: {
  onProjectAdded?: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addProject } = useProjectPost();

  const handleAddProject = (data: any) => {
    addProject(data, {
      onSuccess: () => {
        setIsModalOpen(false);
        if (onProjectAdded) onProjectAdded();
      },
    });
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer border-none bg-transparent p-0"
        aria-label="Dodaj projekt"
      >
        <FiPlus className="text-mainBlue text-lg sm:text-xl lg:text-2xl" />
      </button>

      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddProject}
      />
    </div>
  );
}
