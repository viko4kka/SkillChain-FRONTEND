"use client";

import { useState, useEffect } from "react";
import useMe from "@/hooks/useMe";
import useUserById from "@/hooks/useUserById";
import {
  useAccount,
  useConnect,
  useWriteContract,
  useTransactionReceipt,
} from "wagmi";
import { injected } from "wagmi/connectors";
import { config } from "@/wagmiConfig";
import { abi } from "../abi/abi";
import Button from "./Button";

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

  const alreadyConfirmed = userDataById?.receivedConfirmations?.some(
    (confirmation) =>
      confirmation.skillId === skillId && confirmation.approverId === me?.id,
  );

  const {
    data: receipt,
    isSuccess: isReceiptSuccess,
    isError: isReceiptError,
    error: receiptError,
    isLoading: isReceiptLoading,
  } = useTransactionReceipt({
    hash: txnHash,
    chainId: 11155111,
    config,
    query: { enabled: !!txnHash },
  });

  const sendConfirmationToBackend = async () => {
    const res = await fetch("http://localhost:3001/users/skills/confirmation", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        skillId,
        receiverWallet: userDataById?.walletAddress,
        txnHash,
      }),
    });

    if (res.ok) {
      setApproved(true);
    } else {
      console.error("Backend error:", await res.text());
    }
  };

  useEffect(() => {
    if (isReceiptError) {
      console.error("Transaction error:", receiptError);
    }

    if (isReceiptSuccess && receipt && !approved) {
      sendConfirmationToBackend();
    }
  }, [isReceiptSuccess, isReceiptError, receipt]);

  const handleApproveClick = async () => {
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
      console.error("Contract call failed:", error);
    }
  };

  if (isLoading || !userDataById?.walletAddress || !me?.walletAddress) {
    return null;
  }

  if (alreadyConfirmed || approved) {
    return (
      <span className="inline-flex items-center gap-2 rounded border border-green-200 bg-green-50 px-3 py-1 font-medium text-green-700 shadow">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path
            d="M7.5 13.5L4 10L5.41 8.59L7.5 10.67L14.59 3.59L16 5L7.5 13.5Z"
            fill="#22c55e"
          />
        </svg>
        Approved
      </span>
    );
  }

  return (
    <Button
      onClick={handleApproveClick}
      disabled={isReceiptLoading || (!!txnHash && !isReceiptSuccess)}
    >
      {isReceiptLoading || (!!txnHash && !isReceiptSuccess)
        ? "Pending..."
        : "Approve"}
    </Button>
  );
}
