"use client";

import { useEffect, useState, use } from "react";
import { User } from "@/types/user";
import {
  BsCheckCircleFill,
  BsGeoAlt,
  BsEnvelope,
  BsArrowLeft,
} from "react-icons/bs";
import { MdWork } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

interface UserProfileProps {
  params: Promise<{
    id: string;
  }>;
}

// API function to fetch user by ID from database
const fetchUserById = async (id: string): Promise<User | null> => {
  try {
    const response = await fetch(`/api/users/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export default function UserProfile({ params }: UserProfileProps) {
  const resolvedParams = use(params);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const userData = await fetchUserById(resolvedParams.id);
        setUser(userData);
      } catch (err) {
        setError("Failed to load user profile");
        console.error("Error loading user:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-center items-center py-12">
          <div className="flex items-center space-x-2 text-gray-600">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span>Loading user profile...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            User Not Found
          </h2>
          <p className="text-red-600 mb-4">
            {error || "The requested user could not be found."}
          </p>
          <Link
            href="/search"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <BsArrowLeft />
            <span>Back to User List</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/search"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <BsArrowLeft />
          <span>Back to User List</span>
        </Link>
      </div>

      {/* User Profile Card */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
          {/* Avatar */}
          <div className="flex-shrink-0 relative">
            <Image
              src={
                user.avatar ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`
              }
              alt={user.name}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
              unoptimized={true}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name
                )}&background=0D8ABC&color=fff&size=96`;
              }}
            />
            {user.verified && (
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1">
                <BsCheckCircleFill className="w-6 h-6 text-blue-500" />
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-grow">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            </div>

            {user.title && (
              <div className="flex items-center text-gray-600 mb-2">
                <MdWork className="mr-2" />
                <span className="text-lg">{user.title}</span>
              </div>
            )}

            {user.location && (
              <div className="flex items-center text-gray-500 mb-2">
                <BsGeoAlt className="mr-2" />
                <span>{user.location}</span>
              </div>
            )}

            <div className="flex items-center text-gray-500">
              <BsEnvelope className="mr-2" />
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        {/* Experience */}
        {user.experience && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Experience
            </h2>
            <p className="text-gray-700">{user.experience}</p>
          </div>
        )}

        {/* Skills Section */}
        {user.skills && user.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
          <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Connect
          </button>
          <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Send Message
          </button>
          <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Verify Skills
          </button>
        </div>
      </div>
    </div>
  );
}
