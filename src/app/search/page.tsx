import SearchFrame from "@/components/SearchFrame";
import UserList from "@/components/UserList";
import WhiteBackgroundFrame from "@/components/WhiteBackgroundFrame";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-start">
      <div className="mt-[40px] px-4">
        <WhiteBackgroundFrame>
          <SearchFrame />
        </WhiteBackgroundFrame>
        <UserList />
      </div>
    </div>
  );
}
