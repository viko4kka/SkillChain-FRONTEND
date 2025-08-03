import { GoSearch } from "react-icons/go";
import FilterPanel from "./FilterPanel";

interface SearchFrameProps {
  filters: {
    skillId: number | null;
    languageId: number | null;
    locationId: number | null;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      skillId: number | null;
      languageId: number | null;
      locationId: number | null;
    }>
  >;
  onSearchChange: (value: string) => void;
  searchQuery: string;
}

export default function SearchFrame({
  onSearchChange,
  filters,
  setFilters,
  searchQuery,
}: SearchFrameProps) {
  return (
    <div className="my-2 h-full w-full p-4 sm:my-4 sm:p-6 sm:px-10 lg:px-16">
      <h2 className="text-dark-text text-xl font-bold lg:text-2xl">
        Search person
      </h2>
      <div className="border-dark-text/20 mt-6 flex w-full items-center rounded-sm border px-1 transition">
        <span className="text-dark-text/40 text- flex-shrink-0">
          <GoSearch />
        </span>
        <input
          type="text"
          onChange={(e) => {
            onSearchChange(e.target.value);
            
          }}
          value={searchQuery}
          className="text-dark-text/60 w-full bg-transparent px-1 py-2 text-sm focus:outline-none"
          placeholder="Search person by first name or last name..."
        />
      </div>

      <FilterPanel filters={filters} setFilters={setFilters} />
    </div>
  );
}
