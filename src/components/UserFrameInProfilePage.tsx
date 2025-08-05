"use client";

import useUserById from "@/hooks/useUserById";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { FaLinkedinIn } from "react-icons/fa";
import { LiaGithub } from "react-icons/lia";
import UserDataDetails from "./UserDataDetails";
import Spinner from "./Spinner";
import WhiteBackgroundFrame from "./WhiteBackgroundFrame";

export interface Confirmation {
  skillId: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  imgUrl: string;
  description?: string;
  job?: string;
  gitUrl?: string;
  linkedinUrl?: string;
  linkedinId?: string;
  walletAddress?: string;
  receivedConfirmations?: Confirmation[];
}

export default function UserFrameInProfilePage({
  id,
}: {
  id: number | undefined;
}) {
  const { userDataById, isLoading } = useUserById(id);

  if (isLoading || !userDataById) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const { firstName, lastName, job, gitUrl, linkedinUrl, description, imgUrl } =
    userDataById;

  return (
    <WhiteBackgroundFrame>
      <div className="my-2 h-full w-full p-4 sm:my-4 sm:p-6 sm:px-10 lg:px-16">
        <div className="flex flex-row items-start justify-between gap-x-2">
          <UserDataDetails
            id={id}
            firstName={firstName}
            lastName={lastName}
            job={job}
            gitUrl={gitUrl}
            imgUrl={imgUrl}
            description={description}
            linkedinUrl={linkedinUrl}
          />
        </div>

        <div className="mt-4 lg:hidden">
          <h2 className="text-dark-text text-2xl font-bold">
            {firstName} {lastName}
          </h2>
          <p className="text-mainBlue text-sm font-bold sm:text-base">{job}</p>
          <div className="text-dark-text mt-2 flex flex-row items-center gap-x-0.5 text-xs tracking-wide md:text-sm">
            <CiLocationOn className="text-dark-text text-sm md:text-base" />
            Rzeszów, Polska
          </div>
        </div>

        <p className="text-dark-text mt-4 w-full text-sm break-words sm:mt-6 sm:text-base">
          {description}
        </p>

        <div className="mt-6 flex flex-row items-center justify-start gap-x-2 sm:mt-8 lg:gap-x-6">
          {gitUrl && (
            <Link
              href={gitUrl}
              target="_blank"
              className="bg-main-background text-mainBlue hover:bg-mainLightBlueHover flex flex-row items-center gap-x-1 rounded-sm px-3.5 py-1.5 transition-all lg:px-4 lg:py-2"
            >
              <LiaGithub className="text-xl" />
              GitHub
            </Link>
          )}

          {linkedinUrl && (
            <Link
              href={linkedinUrl}
              target="_blank"
              className="bg-mainBlue hover:bg-mainBlueHover flex flex-row items-center gap-x-1 rounded-sm px-3.5 py-1.5 text-white transition-all lg:px-4 lg:py-2"
            >
              <FaLinkedinIn className="text-lg" />
              LinkedIn
            </Link>
          )}
        </div>
      </div>
    </WhiteBackgroundFrame>
  );
}
