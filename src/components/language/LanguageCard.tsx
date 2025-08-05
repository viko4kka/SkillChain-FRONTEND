import { Language } from "@/types";
import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import EditLanguageForm from "./EditLanguageForm";

interface LanguageCardProps {
  language: Language;
  onLanguageUpdated?: () => void;
  canEdit: boolean;
}

const LanguageCard: React.FC<LanguageCardProps> = ({
  language,
  onLanguageUpdated,
  canEdit,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditClick = () => setIsEditOpen(true);
  const handleCloseModal = () => {
    setIsEditOpen(false);
    if (onLanguageUpdated) onLanguageUpdated();
  };

  return (
    <div className=":px-15 w-full border-b border-gray-200 px-4 py-5 sm:px-10 lg:px-15">
      <div className="flex items-center gap-2">
        <h2 className="text-dark-text font-semibold">{language.name}</h2>
        {canEdit && (
          <FiEdit2
            className="cursor-pointer text-blue-600"
            onClick={handleEditClick}
          />
        )}
      </div>
      <p className="text-dark-text mt-1 text-sm">{language.description}</p>
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 sm:px-6">
          <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <EditLanguageForm
              initialData={language}
              onCloseModal={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default LanguageCard;
