"use client";

import { User as UserType } from "@/types/user";
import Link from "next/link";
import Image from "next/image";
import { BsGeoAlt, BsArrowRight } from "react-icons/bs";

interface UserCardProps {
  user: UserType;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between">
        {/* Left side - Avatar, Info, and Skills - moved 2-3cm from left edge */}
        <div className="flex flex-col ml-6">
          <div className="flex space-x-4">
            {/* Avatar */}
            <div className="flex-shrink-0 relative">
              <Image
                src={
                  user.avatar ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`
                }
                alt={user.name}
                width={88}
                height={88}
                className="w-22 h-22 rounded-full object-cover border-2 border-gray-200"
                unoptimized={true}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name
                  )}&background=0D8ABC&color=fff&size=88`;
                }}
              />
            </div>

            {/* User Info - right beside the avatar */}
            <div className="flex-grow min-w-0">
              {/* Name */}
              <div className="flex items-center space-x-2 mb-1">
                <h3
                  className="text-lg font-bold truncate"
                  style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}
                >
                  {user.name}
                </h3>
              </div>

              {/* Title - removed briefcase icon */}
              {user.title && (
                <div className="mb-2" style={{ color: "#2563EB" }}>
                  <span className="text-sm font-medium">{user.title}</span>
                </div>
              )}

              {/* Location */}
              {user.location && (
                <div
                  className="flex items-center mb-3"
                  style={{ color: "#374151BF" }}
                >
                  <BsGeoAlt className="mr-1 text-sm" />
                  <span className="text-sm">{user.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills - positioned under avatar */}
          {user.skills && user.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 max-w-xs">
              {user.skills.slice(0, 3).map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 text-blue-600 text-xs rounded-full font-medium whitespace-nowrap"
                  style={{ backgroundColor: "#DBEAFE" }}
                >
                  {skill}
                </span>
              ))}
              {user.skills.length > 3 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium whitespace-nowrap">
                  +{user.skills.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* See Details Button - returned to right side but centered vertically */}
        <div className="flex-shrink-0 ml-4 self-center">
          <Link
            href={`/user/${user.id}`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: "400" }}
          >
            See Details →
          </Link>
        </div>
      </div>

      {/* Mobile Layout - Redesigned for 350px width */}
      <div className="md:hidden flex flex-col p-1">
        {/* Top section - Avatar and Info */}
        <div className="flex space-x-3 mb-2">
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
              className="w-14 h-14 rounded-full object-cover border border-gray-200"
              unoptimized={true}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name
                )}&background=0D8ABC&color=fff&size=56`;
              }}
            />
          </div>

          {/* User Info */}
          <div className="flex-grow min-w-0">
            {/* Name */}
            <h3
              className="text-base font-bold truncate"
              style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}
            >
              {user.name}
            </h3>

            {/* Title */}
            {user.title && (
              <div style={{ color: "#2563EB" }}>
                <span className="text-sm font-medium truncate">
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
                <BsGeoAlt className="mr-1 text-xs flex-shrink-0" />
                <span className="truncate">{user.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills - below user info */}
        {user.skills && user.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {user.skills.slice(0, 3).map((skill: string, index: number) => (
              <span
                key={index}
                className="px-2 py-0.5 text-blue-600 text-xs rounded-full font-medium whitespace-nowrap"
                style={{ backgroundColor: "#DBEAFE" }}
              >
                {skill}
              </span>
            ))}
            {user.skills.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium whitespace-nowrap">
                +{user.skills.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* See Details Button - left aligned at bottom */}
        <div className="mt-1">
          <Link
            href={`/user/${user.id}`}
            className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <span>See details</span>
            <BsArrowRight className="ml-1 w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
