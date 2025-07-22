import Link from "next/link";
import React from "react";

export default function SignInButton() {
  return (
    <Link
      href="/login"
      className="bg-mainBlue hover:bg-mainBlueHover rounded-md px-3.5 py-1.5 text-sm text-white transition-all duration-300"
    >
      Log out
    </Link>
  );
}
