import Search from "@/components/searchList/Search";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-start">
      <div className="mt-[40px] px-4">
        <Search />
      </div>
    </div>
  );
}
