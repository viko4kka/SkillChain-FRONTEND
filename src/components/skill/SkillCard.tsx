import { UserSkillWithConfirmations } from "@/types";
import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import EditSkillForm from "./EditSkillForm";
import ApproveButton from "../ApproveButton";
import useMe from "@/hooks/useMe";

interface SkillCardProps {
  skill: UserSkillWithConfirmations;
  onSkillUpdated?: () => void;
  canEdit: boolean;
  userId: number;
}

const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  onSkillUpdated,
  canEdit,
  userId,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditClick = () => setIsEditOpen(true);
  const handleCloseModal = () => {
    setIsEditOpen(false);
    onSkillUpdated?.();
  };

  const { me } = useMe();

  return (
    <div className="w-full border-b border-gray-200 px-4 py-5 sm:px-10 lg:px-15">
      <div className="flex items-center gap-2">
        <h2 className="text-dark-text font-semibold">{skill.name}</h2>
        {canEdit && (
          <FiEdit2
            className="cursor-pointer text-blue-600"
            onClick={handleEditClick}
          />
        )}
      </div>
      <div className="mt-1 flex w-full flex-wrap items-center justify-between gap-4">
        <p className="text-dark-text m-0 text-sm">{skill.description}</p>
        {me?.id !== userId && <ApproveButton userId={userId} skill={skill} />}
      </div>
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 sm:px-6">
          <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <EditSkillForm
              initialData={skill}
              onCloseModal={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default SkillCard;
