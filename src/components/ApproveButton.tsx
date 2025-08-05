"use client";

import useMe from "@/hooks/useMe";
import useUserById from "@/hooks/useUserById";
import { useWriteContract, useAccount, useConnect } from "wagmi";
import { abi } from "../abi/abi";
import Button from "./Button";
import toast from "react-hot-toast";
import { injected } from "wagmi/connectors";
import { config } from "@/wagmiConfig";

export default function ApproveButton({
  id,
  skillId,
}: {
  id: number;
  skillId: number;
}) {
  const { isConnected } = useAccount();
  const { connectAsync } = useConnect({ config });
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
      if (!isConnected) {
        await connectAsync({ connector: injected() });
      }
      const hash = await writeContractAsync({
        abi,
        address: "0x39D31d1Fa395c1Ce96454B4F93011a7656824692",
        functionName: "mintSkill",
        args: [userDataById.walletAddress, 6],
      });
      await fetch("/api/skills/confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skillId: 6,
          receiverWallet: userDataById.walletAddress,
          txnHash: hash,
        }),
      });
      toast.success("Skill approved!");
    } catch (error) {
      console.error("Error approving skill:", error);
      toast.error("Failed to approve skill");
    }
  };

  return (
    <Button onClick={handleApprove}>Approve</Button>
  );
}
