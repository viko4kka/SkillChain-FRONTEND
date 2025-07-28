"use client";

import { useStore } from "@/stores/useStore";
import Link from "next/link";
import { GoSearch } from "react-icons/go";
import Button from "./Button";
import DropDownProfile from "./DropDownProfile";
import LogoSkillChain from "./LogoSkillChain";

export default function Navigation() {
  const { isAuthenticated } = useStore();

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

          {!isAuthenticated && (
            <li className="flex">
              <Link href="/login">
                <Button variant="primary" size="md">
                  <span className="ml-1">Login</span>
                </Button>
              </Link>
            </li>
          )}

          {isAuthenticated && (
            <li>
              <DropDownProfile />
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
}
