
"use client";

import { useRouter } from "next/navigation";
import React from "react";
import useAuth from "@/hooks/useAuth";

export default function LogOutButton() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-mainBlue hover:bg-mainBlueHover rounded-md px-3.5 py-1.5 text-sm text-white transition-all duration-300"
    >
      Log out
    </button>
  );
}
