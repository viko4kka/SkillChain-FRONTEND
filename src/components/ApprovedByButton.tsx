"use client";

import { IoIosArrowRoundForward } from "react-icons/io";
import Button from "./Button";
import Modal from "./Modal";
import UserConfirmerList from "./displayUserConfirmer/UserConfirmerList";
import { Approver } from "@/hooks/useConfirmations";

export default function ApprovedByButton({
  confirmations,
  skillName,
}: {
  confirmations: Approver[];
  skillName: string;
}) {
  return (
    <Modal
      title={skillName}
      button={
        <Button variant="secondary">
          <span className="flex items-center gap-1">
            Approved by
            <IoIosArrowRoundForward className="text-2xl" />
          </span>
        </Button>
      }
    >
      <UserConfirmerList confirmations={confirmations} />
    </Modal>
  );
}
