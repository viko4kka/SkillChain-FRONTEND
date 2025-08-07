"use client";

import { useState } from "react";
import { UserSkillWithConfirmations } from "@/types";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import useUserById from "@/hooks/useUserById";

const ApproverInfoRow = ({ userId }: { userId: number }) => {
  const { userDataById, isLoading } = useUserById(userId);

  if (isLoading) {
    return (
      <div className="flex h-[64px] animate-pulse items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gray-300" />
          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-gray-300"></div>
            <div className="h-3 w-32 rounded bg-gray-300"></div>
          </div>
        </div>
        <div className="h-9 w-32 rounded-lg bg-gray-300"></div>
      </div>
    );
  }

  if (!userDataById) return null;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-200">
          <Image
            src={userDataById.imgUrl || "/default-avatar.png"}
            alt={userDataById.firstName}
            fill
            sizes="48px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div>
          <p className="font-semibold text-gray-800">
            {userDataById.firstName}
          </p>
          <p className="text-sm text-blue-600">{userDataById.job}</p>
        </div>
      </div>
      <Link href={`/profile/${userDataById.id}`} passHref>
        <button className="flex h-9 cursor-pointer items-center gap-2 rounded-lg bg-[#2563eb] px-5 py-2 font-medium text-white transition hover:bg-[#1d4ed8]">
          See details <FaArrowRight />
        </button>
      </Link>
    </div>
  );
};

interface ApprovedByProps {
  skill: UserSkillWithConfirmations;
}

const ApprovedByModal = ({
  skill,
  onClose,
}: {
  skill: UserSkillWithConfirmations;
  onClose: () => void;
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 sm:px-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {skill.name} <span className="font-small">Approved By</span>:
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {skill.confirmations.length > 0 ? (
            skill.confirmations.map((confirmation) => (
              <ApproverInfoRow key={confirmation.id} userId={confirmation.id} />
            ))
          ) : (
            <p className="text-center text-gray-500">
              No approvals yet for this skill.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ApprovedBy({
  skill,
}: ApprovedByProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex h-9 cursor-pointer flex-row items-center justify-center gap-1 rounded-sm bg-blue-50 px-4 py-2 text-center whitespace-nowrap text-blue-600 transition-all duration-300 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="max-w-[140px] truncate">Approved by</span>
        <FaArrowRight />
      </button>
      {isModalOpen && (
        <ApprovedByModal skill={skill} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}