import Image from "next/image";
import React, { useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Modal from "./Modal";
import { GoPencil } from "react-icons/go";
import EditUserProfileForm from "./EditUserProfileForm";
import { useAccount, useSignMessage } from "wagmi";

interface UserDataDetailsProps {
  firstName: string;
  lastName: string;
  job?: string;
  gitUrl?: string;
  linkedinUrl?: string;
  description?: string;
  id: number | undefined;
  imgUrl?: string;
}

function UserDataDetails({
  firstName,
  lastName,
  job,
  gitUrl,
  linkedinUrl,
  description,
  id,
  imgUrl,
}: UserDataDetailsProps) {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [savedAddress, setSavedAddress] = React.useState<string | null>(null);
  const [userId, setUserId] = React.useState<number | null>(null);
  useEffect(() => {
    const fetchUserId = async () => {
      const res = await fetch("http://localhost:3001/auth/me", {
        credentials: "include",
      });
      const data = await res.json();
      setUserId(data.id);
      setSavedAddress(data.walletAddress);
      console.log(data);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const saveWallet = async () => {
      if (isConnected && address && userId && !savedAddress) {
        const message = JSON.stringify({ id: userId });
        const signature = await signMessageAsync({ message });
        await fetch("http://localhost:3001/users/wallet", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ walletAddress:address, signature }),
          credentials: "include",
        });
      }
    };
    saveWallet();
  }, [isConnected, address, userId, savedAddress]);

  return (
    <>
      {" "}
      <div className="relative h-[70px] w-[70px] rounded-full sm:h-[90px] sm:w-[90px] lg:h-[120px] lg:w-[120px]">
        <Image
          src={imgUrl || "/person.jpg"}
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
      <div className="mt-2 flex flex-row flex-wrap items-center justify-start gap-x-2 gap-y-2 sm:gap-x-4 lg:gap-x-6">
        <div className="max-w-full min-w-[90px]">
          <ConnectButton
            label="Connect Wallet"
            accountStatus={{ smallScreen: "avatar", largeScreen: "address" }}
            chainStatus={{ smallScreen: "icon", largeScreen: "icon" }}
            showBalance={{ smallScreen: false, largeScreen: false }}
          />
        </div>

        <Modal
          title="Edit your Profile"
          button={
            <button>
              <GoPencil className="text-mainBlue text-lg sm:text-xl lg:text-2xl" />
            </button>
          }
        >
          {({ closeModal }) => (
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
