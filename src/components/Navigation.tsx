"use client";

import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { BsPerson } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import SignInButton from "./auth/SignInButton";
import LogoSkillChain from "./LogoSkillChain";
import LogOutButton from "./LogOut";

export default function Navigation() {
  const { user } = useAuth();

  return (
    <nav className="z-10">
      <ul className="flex items-center justify-between px-6 py-4 sm:px-12 lg:px-[120px]">
        <li>
          <LogoSkillChain />
        </li>
        <div className="flex flex-row items-center gap-x-2 lg:gap-x-6">
          <li>
            <Link
              href="/search"
              className="text-dark-text hover:bg-main-background flex flex-row items-center gap-x-1.5 rounded-sm px-2 py-1 transition-all duration-300 sm:text-lg lg:px-3 lg:py-1.5"
            >
              <span className="sm:text-xl">
                <GoSearch />
              </span>
              Search
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className="text-dark-text hover:bg-main-background flex flex-row items-center gap-x-1.5 rounded-sm px-2 py-1 transition-all duration-300 sm:text-lg lg:px-3 lg:py-1.5"
            >
              <span className="sm:text-xl">
                <BsPerson />
              </span>
              Profile
            </Link>
          </li>
          <li>{user ? <LogOutButton /> : <SignInButton />}</li>
        </div>
      </ul>
    </nav>
  );
}
