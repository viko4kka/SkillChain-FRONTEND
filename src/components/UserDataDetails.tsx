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
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (savedAddress) {
      await navigator.clipboard.writeText(savedAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const res = await fetch("http://localhost:3001/auth/me", {
        credentials: "include",
      });
      const data = await res.json();
      setUserId(data.id);
      setSavedAddress(data.walletAddress);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const saveWallet = async () => {
      if (isConnected && address && userId && !savedAddress) {
        const message = JSON.stringify({ id: userId });
        const signature = await signMessageAsync({
          message,
          account: address!,
        });
        await fetch("http://localhost:3001/users/wallet", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ walletAddress: address, signature }),
          credentials: "include",
        });
        setSavedAddress(address);
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
        <div className="relative max-w-full min-w-[90px]">
          {savedAddress ? (
            <>
              <span
                className="inline-block max-w-full cursor-pointer rounded-lg border border-[#2563EB] bg-[#2563EB]/10 px-4 py-2 font-mono text-sm break-all text-[#2563EB] shadow transition duration-200 hover:bg-[#2563EB] hover:text-white hover:shadow-lg sm:text-base md:px-5 md:py-2 md:text-lg"
                onClick={handleCopy}
              >
                {savedAddress.slice(0, 5)}...{savedAddress.slice(-3)}
              </span>
              {copied && (
                <span className="absolute top-0 left-1/2 z-50 -translate-x-1/2 -translate-y-[140%] rounded bg-[#2563EB] px-2 py-1 text-xs text-white shadow">
                  Copied!
                </span>
              )}
            </>
          ) : (
            <ConnectButton
              label="Connect Wallet"
              accountStatus={{ smallScreen: "avatar", largeScreen: "address" }}
              chainStatus={{ smallScreen: "icon", largeScreen: "icon" }}
              showBalance={{ smallScreen: false, largeScreen: false }}
            />
          )}
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
