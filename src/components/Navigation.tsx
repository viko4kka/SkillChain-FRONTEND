import Link from "next/link";
import LogoSkillChain from "./LogoSkillChain";
import { BsPerson } from "react-icons/bs";
import { GoSearch } from "react-icons/go";

export default function Navigation() {
  return (
    <nav className="z-10 ">
      <ul className="flex  items-center justify-between px-6 py-4 sm:px-12 lg:px-[120px]">
        <li>
          <LogoSkillChain />
        </li>
        <div className="flex flex-row items-center gap-x-2 lg:gap-x-6">
          <li>
            <Link
              href="/profile"
              className="text-dark-text flex flex-row items-center gap-x-1.5 hover:bg-main-background rounded-sm py-1 px-2 lg:py-1.5 lg:px-3 transition-all duration-300 sm:text-lg "
            >
              <span className="sm:text-xl">
                <BsPerson />
              </span>
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/search"
              className="text-dark-text flex flex-row items-center gap-x-1.5 hover:bg-main-background rounded-sm py-1 px-2 lg:py-1.5 lg:px-3 transition-all duration-300 sm:text-lg"
            >
              <span className="sm:text-xl">
                <GoSearch />
              </span>
              Search
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}
