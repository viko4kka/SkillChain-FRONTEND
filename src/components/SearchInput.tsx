"use client";

import { GoSearch } from "react-icons/go";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchInput({ value, onChange }: SearchInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="border-dark-text/20 mt-6 flex w-full items-center rounded-sm border px-1 transition">
      <span className="text-dark-text/40 text- flex-shrink-0">
        <GoSearch />
      </span>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        className="text-dark-text/60 w-full bg-transparent px-1 py-2 text-sm focus:outline-none"
        placeholder="Search person by first name or last name..."
      />
    </div>
  );
}

export default SearchInput;
