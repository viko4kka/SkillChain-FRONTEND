import Image from "next/image";
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import Button from "./Button";
import Modal from "./Modal";
import { GoPencil } from "react-icons/go";
import EditUserProfileForm from "./EditUserProfileForm";

interface UserDataDetailsProps {
  firstName: string;
  lastName: string;
  job?: string;
  gitUrl?: string;
  linkedinUrl?: string;
  description?: string;
  id: number;
}

function UserDataDetails({
  firstName,
  lastName,
  job,
  gitUrl,
  linkedinUrl,
  description,
  id,
}: UserDataDetailsProps) {
  return (
    <>
      {" "}
      <div className="relative h-[70px] w-[70px] rounded-full sm:h-[90px] sm:w-[90px] lg:h-[120px] lg:w-[120px]">
        <Image
          src="/person.jpg"
          fill
          className="border-main-background overflow-hidden rounded-full border-2 object-cover"
          alt="Profile Picture"
        />
      </div>
      <div className="ml-4 hidden flex-1 lg:block">
        <h2 className="text-dark-text text-2xl font-bold lg:text-3xl">
          {firstName} {lastName}
        </h2>
        <p className="text-mainBlue text-sm font-bold sm:text-base lg:text-lg">
          {job}
        </p>
        <div className="text-dark-text mt-2 flex flex-row items-center gap-x-0.5 text-xs tracking-wide md:text-sm">
          <CiLocationOn className="text-dark-text text-sm md:text-base lg:text-lg" />
          Rzeszów, Polska
        </div>
      </div>
      <div className="flex flex-row items-center justify-start gap-x-2 sm:gap-x-4 lg:gap-x-6">
        <Button variant="darkBlueButtonMetaMaskMobile">
          Connect with MetaMask
        </Button>

        <Modal title="Edit your Profile"
          button={
            <button>
              <GoPencil className="text-mainBlue text-lg sm:text-xl lg:text-2xl" />
            </button>
          }
        >
          {(closeModal) => (
            <EditUserProfileForm
              onCloseModal={closeModal}
              initialData={{
                id: id,
                firstName,
                lastName,
                job: job || "",
                gitUrl: gitUrl || "",
                linkedinUrl: linkedinUrl || "",
                description: description || "",
              }}
            />
          )}
        </Modal>
      </div>
    </>
  );
}

export default UserDataDetails;
