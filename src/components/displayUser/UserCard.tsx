"use client";

import { useRouter } from "next/navigation";
import LanguageDisplay from "./LanguageDisplay";
import SkillUserDisplay from "./SkillUserDisplay";
import UserDisplayInfo from "./UserDisplayInfo";
import { DisplayUser } from "@/hooks/useUsers";
import Button from "../Button";
import { IoIosArrowRoundForward } from "react-icons/io";
import WhiteBackgroundFrame from "../WhiteBackgroundFrame";

type UserProps = {
  user: DisplayUser;
};

export default function UserCard({ user }: UserProps) {
  const router = useRouter();

  const handleSeeDetails = () => {
    router.push(`/profile/${user.id}`);
  };

  return (
    <WhiteBackgroundFrame>
      <div className="p-6">
        <div className="flex flex-col items-start justify-between md:flex-row">
          <div className="flex-1">
            <UserDisplayInfo
              firstName={user.firstName}
              lastName={user.lastName}
              job={user.job}
              location={user.location}
              imgUrl={user.imgUrl}
            />
            <div className="gap-2s mt-2 flex flex-wrap">
              <SkillUserDisplay skills={user.userSkills} />
              <LanguageDisplay languages={user.userLanguages} />
            </div>
          </div>
          <div className="my-0 sm: my-auto">
            <div className="mt-2 flex-shrink-0 sm:mt-0 sm:ml-4">
              <Button onClick={handleSeeDetails}>
                See details
                <IoIosArrowRoundForward className="ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </WhiteBackgroundFrame>
  );
}
