"use client";

import { Approver } from "@/hooks/useConfirmations";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundForward } from "react-icons/io";
import Button from "../Button";

export default function UserConfirmerCard({
  id,
  firstName,
  lastName,
  imgUrl,
  job,
}: Approver) {
  const router = useRouter();

  const handleSeeDetails = () => {
    router.push(`/profile/${id}`);
  };

  return (
    <div className="hover:bg-main-background/30 flex items-center justify-between rounded-md py-2 transition-colors">
      <div className="flex items-center gap-3">
        <div className="relative h-[30px] w-[30px] rounded-full md:h-[50px] md:w-[50px]">
          <Image
            src={imgUrl || "/person.jpg"}
            fill
            className="border-main-background overflow-hidden rounded-full border-1 object-cover"
            alt="Profile Picture"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-dark-text text-sm font-semibold md:text-lg">
            {firstName} {lastName}
          </p>
          {job && (
            <p className="text-mainBlue text-xs font-medium md:text-sm">
              {job}
            </p>
          )}
        </div>
      </div>

      <div className="hidden md:block">
        <Button size="md" onClick={handleSeeDetails}>
          See details
          <IoIosArrowRoundForward />
        </Button>
      </div>
      <div className="block md:hidden">
        <Button size="sm" onClick={handleSeeDetails}>
          See details
          <IoIosArrowRoundForward />
        </Button>
      </div>
    </div>
  );
}
