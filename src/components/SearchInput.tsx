"use client";

import { GoSearch } from "react-icons/go";

type SearchInputProps = {
  onSearchChange: (value: string) => void;
};

function SearchInput({ onSearchChange }: SearchInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    onSearchChange(inputValue);
  };

  return (
    <div className="border-dark-text/20 mt-6 flex w-full items-center rounded-sm border px-1 transition">
      <span className="text-dark-text/40 text- flex-shrink-0">
        <GoSearch />
      </span>
      <input
        type="text"
        onChange={handleInputChange}
        className="text-dark-text/60 w-full bg-transparent px-1 py-2 text-sm focus:outline-none"
        placeholder="Search person by first name or last name..."
      />
    </div>
  );
}

export default SearchInput;
