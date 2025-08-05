"use client";

import React from "react";
import WhiteBackgroundFrame from "../WhiteBackgroundFrame";
import Spinner from "../Spinner";
import { useStore } from "@/stores/useStore";
import useSkillsByUserId from "@/hooks/useSkillByUserId";
import SkillsListHeader from "./SkillsListHeader";
import SkillCard from "./SkillCard";

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
        <div>No skills found.</div>
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
