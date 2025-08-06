"use client";

import React from "react";
import WhiteBackgroundFrame from "../WhiteBackgroundFrame";
import Spinner from "../Spinner";
import { useStore } from "@/stores/useStore";
import LanguageCard from "./LanguageCard";
import useLanguagesByUserId from "@/hooks/useLanguageByUserId";
import LanguagesListHeader from "./LanguagesListHeader";
import { FiFlag } from "react-icons/fi";

interface LanguageListProps {
  userId: number;
}

const LanguageList: React.FC<LanguageListProps> = ({ userId }) => {
  const { isAuthenticated, user } = useStore();
  const canEdit = isAuthenticated && user?.id === userId;

  const { languages, isLoading, refetch } = useLanguagesByUserId(userId);

  const handleLanguageUpdated = () => {
    refetch();
  };
  return (
    <WhiteBackgroundFrame>
      <LanguagesListHeader
        addLanguageProps={{
          onLanguageAdded: handleLanguageUpdated,
        }}
        canEdit={canEdit}
      />
      {isLoading && (
        <div className="flex h-[300px] w-full items-center justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && (!languages || languages.length === 0) && (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-gray-500">
          <FiFlag className="text-mainBlue mb-2 text-4xl" />
          <span className="text-lg font-medium">No languages found</span>
          <span className="text-sm text-gray-400">
            Add your first language using the <b>+</b> button above!
          </span>
        </div>
      )}
      {!isLoading && languages && languages.length > 0 && (
        <>
          {languages.map((language) => (
            <LanguageCard
              key={language.id}
              language={language}
              onLanguageUpdated={handleLanguageUpdated}
              canEdit={canEdit}
            />
          ))}
        </>
      )}
    </WhiteBackgroundFrame>
  );
};

export default LanguageList;
