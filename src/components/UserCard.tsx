"use client";

import { DisplayUser } from "@/hooks/useUsers";
import Image from "next/image";
import { useRouter } from "next/navigation";

type UserProps = {
  user: DisplayUser;
};

//everything is done, but Piotrek only need to add here design for UserCard component and UserList
//he should add here only error handlind like 'users not found' and add here spinner,
// number of users above users list also should be displayed like in Figma design
//also is one more thing to correct in file Search.tsx

export default function UserCard({ user }: UserProps) {
  const router = useRouter();

  const handleSeeDetails = () => {
    router.push(`/profile/${user.id}`);
  };

  return (
    <div className="shadow-for-white-background-frame mt-4 rounded-xl bg-white p-6 transition-shadow hover:shadow-lg">
      {/* Desktop Layout */}
      <div className="hidden md:flex md:items-center md:justify-between">
        <div className="flex gap-4">
          {/* Profile Picture Column */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative h-18 w-18 overflow-hidden rounded-full">
              <Image
                src={user.imgUrl || "/person.jpg"}
                fill
                className="object-cover"
                alt={`${user.firstName} ${user.lastName}`}
              />
            </div>
          </div>

          {/* User Info and Skills Column */}
          <div className="flex-1">
            {/* User Info */}
            <div className="mb-3">
              <h2 className="text-lg font-semibold text-gray-900">
                {user.firstName} {user.lastName}
              </h2>
              <p className="mb-2 text-sm font-medium text-blue-600">
                {user.job || "No job specified"}
              </p>
              {user.location && (
                <div className="mt-1 flex items-center gap-1 text-sm text-gray-600">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 616 0z"
                    />
                  </svg>
                  {user.location.name}
                </div>
              )}
            </div>

            {/* Skills positioned under avatar but flowing right */}
            {user.userSkills.length > 0 && (
              <div className="-ml-24 flex flex-wrap gap-2">
                {user.userSkills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600"
                  >
                    {skill.skill.name}
                  </span>
                ))}
                {user.userSkills.length > 3 && (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
                    +{user.userSkills.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Languages positioned after skills */}
            {user.userLanguages && user.userLanguages.length > 0 && (
              <div className="mt-2 -ml-24 flex flex-wrap gap-2">
                {user.userLanguages.slice(0, 3).map((language, index) => (
                  <span
                    key={index}
                    className="rounded-full px-3 py-1 text-sm font-medium"
                    style={{ backgroundColor: "#8A38F526", color: "#8A38F5" }}
                  >
                    {language.language.name}
                  </span>
                ))}
                {user.userLanguages.length > 3 && (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
                    +{user.userLanguages.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* See Details Button - Desktop */}
        <button
          onClick={handleSeeDetails}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
        >
          See details
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <div className="mb-4 flex items-start gap-3">
          {/* Profile Picture */}
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
            <Image
              src={user.imgUrl || "/person.jpg"}
              fill
              className="object-cover"
              alt={`${user.firstName} ${user.lastName}`}
            />
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm font-medium" style={{ color: "#2563EB" }}>
              {user.job || "No job specified"}
            </p>
            {user.location && (
              <div className="mt-1 flex items-center gap-1 text-sm text-gray-600">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 616 0z"
                  />
                </svg>
                {user.location.name}
              </div>
            )}
          </div>
        </div>

        {/* Skills - Mobile */}
        {user.userSkills.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {user.userSkills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600"
              >
                {skill.skill.name}
              </span>
            ))}
            {user.userSkills.length > 3 && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
                +{user.userSkills.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Languages - Mobile */}
        {user.userLanguages && user.userLanguages.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {user.userLanguages.slice(0, 3).map((language, index) => (
              <span
                key={index}
                className="rounded-full px-3 py-1 text-sm font-medium"
                style={{ backgroundColor: "#8A38F526", color: "#8A38F5" }}
              >
                {language.language.name}
              </span>
            ))}
            {user.userLanguages.length > 3 && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
                +{user.userLanguages.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* See Details Button - Mobile (Less than half width) */}
        <button
          onClick={handleSeeDetails}
          className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          style={{ backgroundColor: "#2563EB" }}
        >
          See details
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
