import Navigation from "./Navigation";

export default function Header() {
  return (
    <div className="flex items-center justify-center bg-white">
      <div className="bg-white-text w-[1200px]">
        <Navigation />
      </div>
    </div>
  );
}
