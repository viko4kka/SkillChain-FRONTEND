"use client";

import { useState, useEffect } from "react";
import useMe from "@/hooks/useMe";
import useUserById from "@/hooks/useUserById";
import {
  useAccount,
  useConnect,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { injected } from "wagmi/connectors";
import { config } from "@/wagmiConfig";
import { abi } from "../abi/abi";
import Button from "./Button";
import { FaCheck } from "react-icons/fa";
import { UserSkillWithConfirmations } from "@/types";
import useSkillsByUserId from "@/hooks/useSkillByUserId";

export default function ApproveButton({
  userId,
  skill,
}: {
  userId: number;
  skill: UserSkillWithConfirmations;
}) {
  const { me } = useMe();
  const { userDataById, isLoading } = useUserById(userId);
  const { isConnected } = useAccount();
  const { connectAsync } = useConnect({ config });
  const { writeContractAsync } = useWriteContract();
  const { refetch } = useSkillsByUserId(userId);

  const [txnHash, setTxnHash] = useState<`0x${string}` | undefined>();
  const [approved, setApproved] = useState(false);
  const [isBackendLoading, setIsBackendLoading] = useState(false);

  const alreadyConfirmed = skill.confirmations.some(
    (confirmation) => confirmation.id === me?.id,
  );

  const { isLoading: isReceiptLoading, isSuccess: isReceiptSuccess } =
    useWaitForTransactionReceipt({
      hash: txnHash,
      query: { enabled: !!txnHash },
      confirmations: 1,
    });

  useEffect(() => {
    if (isReceiptSuccess && txnHash && !approved) {
      setIsBackendLoading(true);
      (async () => {
        const res = await fetch(
          "http://localhost:3001/users/skills/confirmation",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              skillId: skill.id,
              receiverWallet: userDataById?.walletAddress,
              txnHash,
            }),
          },
        );
        setIsBackendLoading(false);
        if (res.ok) {
          setApproved(true);
          await refetch();
        } else {
          console.error("Backend error:", await res.text());
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReceiptSuccess, txnHash, approved, skill, userDataById]);

  if (alreadyConfirmed || approved) {
    return (
      <span className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-green-600">
        <FaCheck className="text-green-500" />
        Approved
      </span>
    );
  }

  const handleApprove = async () => {
    try {
      if (!isConnected) {
        await connectAsync({ connector: injected() });
      }
      const hash = await writeContractAsync({
        abi,
        address: "0xF14C6D319c582511Af0268e7187D59C4d75b467C",
        functionName: "mintSkill",
        args: [userDataById!.walletAddress, skill.id],
      });
      setTxnHash(hash);
    } catch (error) {
      console.error("Error approving skill:", error);
    }
  };

  if (isLoading || !userDataById?.walletAddress || !me?.walletAddress) {
    return null;
  }
  return (
    <Button onClick={handleApprove} disabled={isReceiptLoading || !!txnHash}>
      {isReceiptLoading || isBackendLoading ? "Pending..." : "Approve"}
    </Button>
  );
}
