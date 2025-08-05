"use client";

import useMe from "@/hooks/useMe";
import useUserById from "@/hooks/useUserById";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { abi } from "../abi/abi";
import Button from "./Button";
import toast from "react-hot-toast";

export default function ApproveButton({
  id,
  skillId,
}: {
  id: number;
  skillId: number;
}) {
  const { writeContractAsync } = useWriteContract();
  const { me } = useMe();
  const { userDataById, isLoading } = useUserById(id);
  const myWalletAddress = me?.walletAddress;

  const alreadyConfirmed = userDataById?.receivedConfirmations?.some(
    (confirmation: { skillId: number }) => confirmation.skillId === skillId,
  );

  if (
    isLoading ||
    !userDataById ||
    !userDataById.walletAddress ||
    !myWalletAddress ||
    alreadyConfirmed
  ) {
    return null;
  }

  const handleApprove = async () => {
    try {
      const hash = await writeContractAsync({
        abi: abi,
        address: process.env.CONTRACT_ADDRESS as `0x${string}`,
        functionName: "mintSkill",
        args: [userDataById.walletAddress, skillId],
      });
      await fetch("/api/skills/confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          skillId,
          receiverWallet: userDataById.walletAddress,
          txnHash: hash
        }),
      });
    } catch {
      toast.error("Failed to approve skill");
    }

    return <Button onClick={handleApprove}>Approve</Button>;
  };
}
