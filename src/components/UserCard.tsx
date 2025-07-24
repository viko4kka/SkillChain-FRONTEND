"use client";

import { User as UserType } from "@/types/user";
import Link from "next/link";
import Image from "next/image";
import { BsGeoAlt, BsArrowRight } from "react-icons/bs";
import WhiteBackgroundFrame from "./WhiteBackgroundFrame";

interface UserCardProps {
  user: UserType;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div style={{ marginTop: "1cm" }}>
      <WhiteBackgroundFrame>
        {/* Desktop Layout */}
        <div className="hidden w-full md:block">
          <div className="flex w-full flex-row items-center">
            {/* Left: Avatar */}
            <div className="flex w-32 flex-shrink-0 flex-col items-center">
              <Image
                src={
                  user.avatar ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`
                }
                alt={user.name}
                width={88}
                height={88}
                className="h-22 w-22 rounded-full border-2 border-gray-200 object-cover"
                unoptimized={true}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name,
                  )}&background=0D8ABC&color=fff&size=88`;
                }}
              />
            </div>

            {/* Middle: Name, Title, Location */}
            <div className="flex min-w-0 flex-grow flex-col px-6">
              <h3
                className="truncate text-lg font-bold"
                style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}
              >
                {user.name}
              </h3>
              {user.title && (
                <div className="mb-2" style={{ color: "#2563EB" }}>
                  <span className="text-sm font-medium">{user.title}</span>
                </div>
              )}
              {user.location && (
                <div
                  className="mb-3 flex items-center"
                  style={{ color: "#374151BF" }}
                >
                  <BsGeoAlt className="mr-1 text-sm" />
                  <span className="text-sm">{user.location}</span>
                </div>
              )}
            </div>

            {/* Right: See Details Button */}
            <div
              className="flex h-full flex-shrink-0 flex-col items-end justify-center"
              style={{ marginRight: "1cm", marginTop: "7mm" }}
            >
              <Link
                href={`/user/${user.id}`}
                className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2 text-sm text-white transition-colors duration-200 hover:bg-blue-700"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: "400" }}
              >
                See details <BsArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Skills row: spans under the whole card */}
          {user.skills && user.skills.length > 0 && (
            <div
              className="mt-3 flex flex-wrap gap-2"
              style={{ marginLeft: "5mm" }}
            >
              {user.skills.slice(0, 3).map((skill: string, index: number) => (
                <span
                  key={index}
                  className="rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap text-blue-600"
                  style={{ backgroundColor: "#DBEAFE" }}
                >
                  {skill}
                </span>
              ))}
              {user.skills.length > 3 && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium whitespace-nowrap text-gray-600">
                  +{user.skills.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Mobile Layout */}
        <div className="flex flex-col p-1 md:hidden">
          {/* Top section - Avatar and Info */}
          <div className="mb-2 flex space-x-3">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Image
                src={
                  user.avatar ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`
                }
                alt={user.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full border border-gray-200 object-cover"
                unoptimized={true}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name,
                  )}&background=0D8ABC&color=fff&size=56`;
                }}
              />
            </div>

            {/* User Info */}
            <div className="min-w-0 flex-grow">
              {/* Name */}
              <h3
                className="truncate text-base font-bold"
                style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}
              >
                {user.name}
              </h3>

              {/* Title */}
              {user.title && (
                <div style={{ color: "#2563EB" }}>
                  <span className="truncate text-sm font-medium">
                    {user.title}
                  </span>
                </div>
              )}

              {/* Location */}
              {user.location && (
                <div
                  className="flex items-center text-xs"
                  style={{ color: "#374151BF" }}
                >
                  <BsGeoAlt className="mr-1 flex-shrink-0 text-xs" />
                  <span className="truncate">{user.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills - below user info */}
          {user.skills && user.skills.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1">
              {user.skills.slice(0, 3).map((skill: string, index: number) => (
                <span
                  key={index}
                  className="rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap text-blue-600"
                  style={{ backgroundColor: "#DBEAFE" }}
                >
                  {skill}
                </span>
              ))}
              {user.skills.length > 3 && (
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-gray-600">
                  +{user.skills.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* See Details Button - left aligned at bottom */}
          <div className="mt-1">
            <Link
              href={`/user/${user.id}`}
              className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white transition-colors duration-200 hover:bg-blue-700"
            >
              <span>See details</span>
              <BsArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>
      </WhiteBackgroundFrame>
    </div>
  );
}
