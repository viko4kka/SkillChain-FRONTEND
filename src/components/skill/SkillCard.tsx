import { SkillWithConfirmations } from "@/hooks/useConfirmations";
import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import ApproveButton from "../ApproveButton";
import ApprovedByButton from "../ApprovedByButton";
import EditSkillForm from "./EditSkillForm";

interface SkillCardProps {
  skill: SkillWithConfirmations;
  onSkillUpdated?: () => void;
  canEdit: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  onSkillUpdated,
  canEdit,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditClick = () => setIsEditOpen(true);
  const handleCloseModal = () => {
    setIsEditOpen(false);
    onSkillUpdated?.();
  };

  return (
    <div className=":px-15 w-full border-b border-gray-200 px-4 py-5 sm:px-10 lg:px-15">
      <div className="flex items-center gap-2">
        <h2 className="text-dark-text font-semibold">{skill.name}</h2>
        {canEdit && (
          <FiEdit2
            className="cursor-pointer text-blue-600"
            onClick={handleEditClick}
          />
        )}
      </div>
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <p className="text-dark-text mt-1 max-w-full text-sm break-words md:max-w-[50%]">
          {skill.description}
        </p>

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

        <div className="flex flex-row items-center gap-x-2 md:justify-end">
          <ApproveButton />
          <ApprovedByButton confirmations={skill.confirmations ?? []}  skillName={skill.name}/>
        </div>
      </div>
    </div>
  );
};
export default SkillCard;
