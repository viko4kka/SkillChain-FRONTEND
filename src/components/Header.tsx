import Navigation from "./Navigation";

export default function Header() {
  return (
    <div className="max-w-7xl flex items-center justify-between mx-auto  ">
      <div className=" bg-white-text w-full ">
        <Navigation />
      </div>
    </div>
  );
}
