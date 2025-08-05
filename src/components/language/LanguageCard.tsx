import { Language } from "@/types";
import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";

interface LanguageCardProps {
  language: Language;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ language }) => {
  return (
    <div className=":px-15 w-full border-b border-gray-200 px-4 py-5 sm:px-10 lg:px-15">
      <div className="flex items-center gap-2">
        <h2 className="text-dark-text font-semibold">
          {language.name} - {language.description}
        </h2>
        <FiEdit2 className="cursor-pointer text-blue-600" />
      </div>
    </div>
  );
};
export default LanguageCard;