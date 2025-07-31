import Image from "next/image";
import React, { useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Modal from "./Modal";
import useMe from "@/hooks/useMe";
import { GoPencil } from "react-icons/go";
import EditUserProfileForm from "./EditUserProfileForm";
import { useStore } from "@/stores/useStore";
import { useAccount, useSignMessage } from "wagmi";
import toast from "react-hot-toast";
import { useSaveWallet } from "@/hooks/useSaveWallet";

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
  const { isAuthenticated, user } = useStore();
  const canEdit = isAuthenticated && user?.id === id;
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { me } = useMe();
  const isOwnProfile = me?.id === id;
  const saveWallet = useSaveWallet();
  const savedAddress = me?.walletAddress ?? null;
  const userId = me?.id ?? null;

  const handleCopy = async () => {
    if (savedAddress) {
      await navigator.clipboard.writeText(savedAddress);
      toast.dismiss("copy-toast");
      toast.success("Copied!", { id: "copy-toast" });
    }
  };

  useEffect(() => {
    const handleSaveWallet = async () => {
      if (isConnected && address && userId && !savedAddress) {
        const message = JSON.stringify({ id: userId });
        const signature = await signMessageAsync({
          message,
          account: address!,
        });
        saveWallet.mutate({
          walletAddress: address,
          signature,
        });
      }
    };
    handleSaveWallet();
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
        <div className="relative max-w-full min-w-[90px]">
          {isOwnProfile ? (
             savedAddress ? (
            <span
              className="inline-block max-w-full cursor-pointer rounded-lg border border-[#2563EB] bg-[#2563EB]/10 px-4 py-2 font-mono text-sm break-all text-[#2563EB] shadow transition duration-200 select-none hover:bg-[#2563EB] hover:text-white hover:shadow-lg sm:text-base md:px-5 md:py-2 md:text-lg"
              onClick={handleCopy}
            >
              {savedAddress.slice(0, 5)}...{savedAddress.slice(-3)}
            </span>
          ) : (
            <ConnectButton
              label="Connect Wallet"
              accountStatus={{ smallScreen: "avatar", largeScreen: "address" }}
              chainStatus={{ smallScreen: "icon", largeScreen: "icon" }}
              showBalance={{ smallScreen: false, largeScreen: false }}
            />
          )
        ) : null}
        </div>

        <div className="hidden w-[130px] lg:block">
          <Button variant="primary" size="md" fullWidth>
            <span className="text-center text-sm leading-tight">
              Connect with MetaMask
            </span>
          </Button>
        </div>
        {canEdit && (
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
        )}
      </div>
    </>
  );
}

export default UserDataDetails;
