import SearchFrame from "@/components/SearchFrame";
import UserCard from "@/components/UserCard";
import WhiteBackgroundFrame from "@/components/WhiteBackgroundFrame";
import { defaultValues } from "@/dummy-data";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-start">
      <div className="mt-[40px] px-4">
        <WhiteBackgroundFrame>
          <SearchFrame />
        </WhiteBackgroundFrame>
        <div className="mt-6 w-full max-w-2xl">
          {defaultValues.map((user) => (
            <UserCard
              key={user.id}
              firstName={user.firstName}
              lastName={user.lastName}
              job={user.job}
              description={user.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
