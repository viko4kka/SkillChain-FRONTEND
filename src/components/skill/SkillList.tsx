"use client";

import React from "react";
import WhiteBackgroundFrame from "../WhiteBackgroundFrame";
import Spinner from "../Spinner";
import { useStore } from "@/stores/useStore";
import useSkillsByUserId from "@/hooks/useSkillByUserId";
import SkillsListHeader from "./SkillsListHeader";
import SkillCard from "./SkillCard";
import { FiStar } from "react-icons/fi";

interface SkillListProps {
  userId: number;
}

const SkillList: React.FC<SkillListProps> = ({ userId }) => {
  const { isAuthenticated, user } = useStore();
  const canEdit = isAuthenticated && user?.id === userId;

  const { skills, isLoading, refetch } = useSkillsByUserId(userId);

  const handleSkillUpdated = () => {
    refetch();
  };
  return (
    <WhiteBackgroundFrame>
      <SkillsListHeader
        addSkillProps={{
          onSkillAdded: handleSkillUpdated,
        }}
        canEdit={canEdit}
      />
      {isLoading && (
        <div className="flex h-[300px] w-full items-center justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && (!skills || skills.length === 0) && (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-gray-500">
          <FiStar className="text-mainBlue mb-2 text-4xl" />
          <span className="text-lg font-medium">No skills found</span>
          {canEdit && (
            <span className="text-sm text-gray-400">
              Add your first skill using the <b>+</b> button above!
            </span>
          )}
        </div>
      )}
      {!isLoading && skills && skills.length > 0 && (
        <>
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onSkillUpdated={handleSkillUpdated}
              canEdit={canEdit}
            />
          ))}
        </>
      )}
    </WhiteBackgroundFrame>
  );
};

export default SkillList;
