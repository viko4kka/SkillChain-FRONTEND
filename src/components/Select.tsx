import React from "react";

export default function Select() {
  return (
    <>
      {/* Skills */}
      <div className="flex w-full flex-col items-start gap-y-2 md:justify-between">
        <label className="text-sm text-gray-700">Skills</label>
        <div className="relative w-full">
          <select
            className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-500 focus:border-gray-400 focus:outline-none"
            defaultValue=""
          >
            <option value="">All skills</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 8l4 4 4-4"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Language */}
      <div className="flex w-full flex-col items-start gap-y-2 md:justify-between">
        <label className="text-sm text-gray-700">Language</label>
        <div className="relative w-full">
          <select
            className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-500 focus:border-gray-400 focus:outline-none"
            defaultValue=""
          >
            <option value="">All languages</option>
            <option value="polish">Polish</option>
            <option value="english">English</option>
            <option value="german">German</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 8l4 4 4-4"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="flex w-full flex-col items-start gap-y-2 md:justify-between">
        <label className="text-sm text-gray-700">Location</label>
        <div className="relative w-full">
          <select
            className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-500 focus:border-gray-400 focus:outline-none"
            defaultValue=""
          >
            <option value="">All locations</option>
            <option value="krakow">Kraków</option>
            <option value="rzeszow">Rzeszów</option>
            <option value="gdansk">Gdańsk</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 8l4 4 4-4"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
