import React from "react";
import Button from "./Button";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function ApprovedByButton() {
  return (
    <Button variant="secondary">
      <span className="flex items-center gap-1">
        Approved by
        <IoIosArrowRoundForward className="text-2xl" />
      </span>
    </Button>
  );
}
