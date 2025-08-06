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

export default function ApproveButton({
  id,
  skillId,
}: {
  id: number;
  skillId: number;
}) {
  const { me } = useMe();
  const { userDataById, isLoading } = useUserById(id);
  const { isConnected } = useAccount();
  const { connectAsync } = useConnect({ config });
  const { writeContractAsync } = useWriteContract();

  const [txnHash, setTxnHash] = useState<`0x${string}` | undefined>();
  const [approved, setApproved] = useState(false);
  const [isBackendLoading, setIsBackendLoading] = useState(false);

  const alreadyConfirmed = userDataById?.receivedConfirmations?.some(
    (confirmation) =>
      confirmation.skillId === skillId && confirmation.approverId === me?.id,
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
              skillId,
              receiverWallet: userDataById?.walletAddress,
              txnHash,
            }),
          },
        );
        setIsBackendLoading(false);
        if (res.ok) {
          setApproved(true);
        } else {
          console.error("Backend error:", await res.text());
        }
      })();
    }
  }, [isReceiptSuccess, txnHash, approved, skillId, userDataById]);

  if (alreadyConfirmed || approved) {
    return (
      <span className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 font-semibold text-green-600">
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
        address: "0x39D31d1Fa395c1Ce96454B4F93011a7656824692",
        functionName: "mintSkill",
        args: [userDataById!.walletAddress, skillId],
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
