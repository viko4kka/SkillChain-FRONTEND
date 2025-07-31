import FilterPanel from "./FilterPanel";
import SearchInput from "./SearchInput";

interface SearchFrameProps {
  onSearchChange: (value: string) => void;
}

export default function SearchFrame({ onSearchChange }: SearchFrameProps) {
  return (
    <div className="my-2 h-full w-full p-4 sm:my-4 sm:p-6 sm:px-10 lg:px-16">
      <h2 className="text-dark-text text-xl font-bold lg:text-2xl">
        Search person
      </h2>

      <SearchInput onSearchChange={onSearchChange} />
      <FilterPanel />
    </div>
  );
}
