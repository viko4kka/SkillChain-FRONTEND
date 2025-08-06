"use client";
import useSkillPost from "@/hooks/useSkillPost";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import AddSkillModal from "./AddSkillModal";

export default function AddSkill({
  onSkillAdded,
}: {
  onSkillAdded?: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addSkillInput } = useSkillPost();

  const handleAddSkill = (data: any) => {
    addSkillInput(data, {
      onSuccess: () => {
        setIsModalOpen(false);
        if (onSkillAdded) onSkillAdded();
      },
    });
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer border-none bg-transparent p-0"
        aria-label="Add skill"
      >
        <FiPlus className="text-mainBlue text-lg sm:text-xl lg:text-2xl" />
      </button>

      <AddSkillModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddSkill}
      />
    </div>
  );
}