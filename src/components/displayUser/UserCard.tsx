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
      <div>
        <div className="flex flex-col md:flex-row md:items-start">
          <UserDisplayInfo
            firstName={user.firstName}
            lastName={user.lastName}
            job={user.job}
            location={user.location}
            imgUrl={user.imgUrl}
          />

          <div className="flex flex-col gap-2">
            <SkillUserDisplay skills={user.userSkills} />
            <LanguageDisplay languages={user.userLanguages} />
          </div>
        </div>

        <Button onClick={handleSeeDetails}>
          See details
          <span>
            <IoIosArrowRoundForward />
          </span>
        </Button>
      </div>
    </WhiteBackgroundFrame>
  );
}
