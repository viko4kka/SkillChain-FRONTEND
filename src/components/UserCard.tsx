"use client";

import { User } from "@/types/user";
import Link from "next/link";
import Image from "next/image";
import { BsCheckCircleFill, BsGeoAlt, BsArrowRight } from "react-icons/bs";
import { MdWork } from "react-icons/md";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between">
        {/* Left side - Avatar and Info */}
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="flex-shrink-0 relative">
            <Image
              src={
                user.avatar ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`
              }
              alt={user.name}
              width={56}
              height={56}
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
              unoptimized={true}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name
                )}&background=0D8ABC&color=fff&size=56`;
              }}
            />
            {user.verified && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                <BsCheckCircleFill className="w-4 h-4 text-blue-500" />
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-grow min-w-0">
            {/* Name */}
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {user.name}
              </h3>
            </div>

            {/* Title */}
            {user.title && (
              <div className="flex items-center text-gray-600 mb-2">
                <MdWork className="mr-1 text-sm" />
                <span className="text-sm font-medium">{user.title}</span>
              </div>
            )}

            {/* Location */}
            {user.location && (
              <div className="flex items-center text-gray-500 mb-3">
                <BsGeoAlt className="mr-1 text-sm" />
                <span className="text-sm">{user.location}</span>
              </div>
            )}

            {/* Skills */}
            {user.skills && user.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {user.skills.slice(0, 6).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium whitespace-nowrap"
                  >
                    {skill}
                  </span>
                ))}
                {user.skills.length > 6 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-medium whitespace-nowrap">
                    +{user.skills.length - 6} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right side - See Details Button */}
        <div className="flex-shrink-0 ml-4">
          <Link
            href={`/user/${user.id}`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            See Details →
          </Link>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Top section - Avatar and Info with Button */}
        <div className="flex items-start space-x-3 mb-3">
          {/* Avatar */}
          <div className="flex-shrink-0 relative">
            <Image
              src={
                user.avatar ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`
              }
              alt={user.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
              unoptimized={true}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name
                )}&background=0D8ABC&color=fff&size=48`;
              }}
            />
            {user.verified && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                <BsCheckCircleFill className="w-3 h-3 text-blue-500" />
              </div>
            )}
          </div>

          {/* User Info and Button Container */}
          <div className="flex-grow min-w-0 flex justify-between items-start">
            {/* User Info */}
            <div className="flex-grow min-w-0">
              {/* Name */}
              <h3 className="text-base font-semibold text-gray-900 truncate mb-1">
                {user.name}
              </h3>

              {/* Title */}
              {user.title && (
                <div className="flex items-center text-gray-600 mb-1">
                  <MdWork className="mr-1 text-sm flex-shrink-0" />
                  <span className="text-sm font-medium truncate">
                    {user.title}
                  </span>
                </div>
              )}

              {/* Location */}
              {user.location && (
                <div className="flex items-center text-gray-500">
                  <BsGeoAlt className="mr-1 text-sm flex-shrink-0" />
                  <span className="text-sm truncate">{user.location}</span>
                </div>
              )}
            </div>

            {/* See Details Button positioned at title/location level */}
            <div className="ml-3 flex-shrink-0 mt-1">
              <Link
                href={`/user/${user.id}`}
                className="inline-flex items-center space-x-1 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <span>See details</span>
                <BsArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Skills */}
        {user.skills && user.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {user.skills.slice(0, 5).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium whitespace-nowrap"
              >
                {skill}
              </span>
            ))}
            {user.skills.length > 5 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-medium whitespace-nowrap">
                +{user.skills.length - 5} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
