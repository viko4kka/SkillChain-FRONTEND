"use client";

import { useRouter } from "next/navigation";
import React from "react";
import useAuth from "@/hooks/useAuth";
import { FiLogOut } from "react-icons/fi";

interface LogOutButtonProps {
  variant?: "default" | "dropdown";
  onLogout?: () => void;
}

export default function LogOutButton({
  variant = "default",
  onLogout,
}: LogOutButtonProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/");
    onLogout?.();
  };

  if (variant === "dropdown") {
    return (
      <button
        onClick={handleLogout}
        className="text-dark-text flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
      >
        <FiLogOut />
        Log out
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-mainBlue hover:bg-mainBlueHover rounded-md px-3.5 py-1.5 text-sm text-white transition-all duration-300"
    >
      Log out
    </button>
  );
}
