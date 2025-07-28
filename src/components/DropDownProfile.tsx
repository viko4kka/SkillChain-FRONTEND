"use client";

import { useStore } from "@/stores/useStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import LogOutButton from "./LogOutButton";

export default function DropDownProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated } = useStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isAuthenticated) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="text-dark-text flex items-center gap-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Image
          width={25}
          height={25}
          src={user?.imgUrl || "/person.jpg"}
          alt="Profile Picture"
          className="rounded-full border border-gray-300"
        />
        <span className="hidden sm:block">
          {user?.firstName} {user?.lastName}
        </span>
        <FiChevronDown className="text-sm" />
      </button>

      {isOpen && (
        <div className="border-dark-text/10 absolute right-0 z-50 mt-2 w-44 rounded-lg border bg-white shadow-lg">
          <div className="py-1">
            <Link
              href="/profile"
              className="text-dark-text flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 sm:hidden"
            >
              <BsPerson />
              Profile
            </Link>

            <LogOutButton
              variant="dropdown"
              onLogout={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
