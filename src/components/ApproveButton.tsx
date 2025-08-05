"use client";

import useUserById from "@/hooks/useUserById";
import { useWriteContract } from "wagmi";
import { abi } from "../abi/abi";
import Button from "./Button";

export default function ApproveButton({ id }: { id: number }) {
  const { writeContract } = useWriteContract();
  const { userDataById, isLoading } = useUserById(id);

  if (isLoading || !userDataById) return null;

  const { id: userId, walletAddress } = userDataById;

  if (!walletAddress) return null;

  console.log(userId, walletAddress);
  return (
    <>
      <Button
        onClick={() =>
          writeContract({
            abi,
            address: process.env.CONTRACT_ADDRESS as `0x${string}`,
            functionName: "mintSkill",
            args: [walletAddress, userId],
          })
        }
      >
        Approve
      </Button>
    </>
  );
}
