"use client";

import React from "react";
import WhiteBackgroundFrame from "../WhiteBackgroundFrame";
import Spinner from "../Spinner";
import { useStore } from "@/stores/useStore";
import LanguageCard from "./LanguageCard";
import LanguagesHeaderList from "./LanguageHeaderList";
import useLanguagesByUserId from "@/hooks/useLanguageByUserId";

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
      <LanguagesHeaderList
        AddLanguageProps={{
          onProjectAdded: handleLanguageUpdated,
        }}
        canEdit={canEdit}
      />
      {isLoading && (
        <div className="flex h-[300px] w-full items-center justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && (!languages || languages.length === 0) && (
        <div>No languages found.</div>
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
