"use client";

import { User as UserType } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { BsGeoAlt, BsArrowRight } from "react-icons/bs";
import WhiteBackgroundFrame from "./WhiteBackgroundFrame";

interface UserCardProps {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    job?: string;
    email: string;
    imgUrl?: string;
    locationId?: number;
    skills?: string;
    name: string; // Added by UserList
    title?: string; // Added by UserList
    location?: string; // Added by UserList
    avatar?: string; // Added by UserList
  };
}

export default function UserCard({ user }: UserCardProps) {
  console.log("UserCard rendering with data:", user);

  return (
    <div style={{ marginTop: "1cm" }}>
      <WhiteBackgroundFrame>
        {/* Desktop Layout */}
        <div className="hidden w-full md:block">
          <div
            className="flex w-full flex-row items-center"
            style={{
              minHeight: "120px", // Makes card taller
              paddingTop: "32px", // More space above
              paddingBottom: "32px", // More space below
              background: "#fff", // White background
              borderRadius: "16px", // Rounded corners
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)", // Subtle shadow
              flexWrap: "wrap", // allow wrapping for skills row
            }}
          >
            {/* Left: Avatar */}
            <div className="flex w-32 flex-shrink-0 flex-col items-center">
              <Image
                src={
                  user.avatar ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`
                }
                alt={`Profile picture of ${user.name || "user"}`}
                width={88}
                height={88}
                className="h-22 w-22 rounded-full border-2 border-gray-200 object-cover"
                unoptimized={true}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name,
                  )}&background=0D8ABC&color=fff&size=88`;

                  // Ensure alt text is present even after src change
                  if (!target.alt) {
                    target.alt = user.name || "User profile";
                  }
                }}
              />
            </div>

            {/* Middle: Name, Title, Location, Skills */}
            <div className="flex min-w-0 flex-grow flex-col px-6">
              <h3 className="truncate text-lg font-bold">{user.name}</h3>
              {user.title && (
                <div className="mb-2" style={{ color: "#2563EB" }}>
                  <span className="text-sm font-medium">{user.title}</span>
                </div>
              )}
              {user.location && (
                <div className="flex items-center text-gray-500">
                  <BsGeoAlt className="mr-1 text-sm" />
                  <span className="text-sm">{user.location}</span>
                </div>
              )}
              {/* Skills row: now inside the card */}
              {user.skills && user.skills.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {user.skills
                    .split(",")
                    .slice(0, 3)
                    .map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap text-blue-600"
                        style={{ backgroundColor: "#DBEAFE" }}
                      >
                        {skill}
                      </span>
                    ))}
                  {user.skills.length > 3 && (
                    <span
                      className="rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap text-blue-600"
                      style={{ backgroundColor: "#DBEAFE" }}
                    >
                      +{user.skills.split(",").length - 3} more
                    </span>
                  )}
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
                alt={`Profile picture of ${user.name || "user"}`}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full border border-gray-200 object-cover"
                unoptimized={true}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name,
                  )}&background=0D8ABC&color=fff&size=56`;

                  // Ensure alt text is present even after src change
                  if (!target.alt) {
                    target.alt = `Profile picture of ${user.name || "user"}`;
                  }
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
                <div className="flex items-center text-gray-500">
                  <BsGeoAlt className="mr-1 flex-shrink-0 text-xs" />
                  <span className="truncate">{user.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills - below user info */}
          {user.skills && user.skills.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {user.skills
                .split(",")
                .slice(0, 3)
                .map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap text-blue-600"
                    style={{ backgroundColor: "#DBEAFE" }}
                  >
                    {skill}
                  </span>
                ))}
              {user.skills.length > 3 && (
                <span
                  className="rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap text-blue-600"
                  style={{ backgroundColor: "#DBEAFE" }}
                >
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
