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
      <div className="mt-[0px] space-y-4 px-2 py-8">
        <div style={{ marginLeft: "5mm" }}>
          <WhiteBackgroundFrame>
            <SearchFrame />
          </WhiteBackgroundFrame>
        </div>
        <UserList />
      </div>
    </div>
    </div>
  );
}
