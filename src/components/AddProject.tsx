"use client";

import { useState } from "react";
import AddProjectModal from "@/components/AddProjectModal";
import { FiPlus } from "react-icons/fi";

export default function AddProject({
  iconColor = "#007bff",
}: {
  iconColor?: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProject = (data: any) => {
    console.log("Dodany projekt:", data);
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
        aria-label="Dodaj projekt"
      >
        <FiPlus size={20} color="var(--color-mainBlue)" />
      </button>

      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddProject}
      />
    </div>
  );
}
