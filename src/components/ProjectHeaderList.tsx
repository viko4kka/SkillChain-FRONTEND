import AddProject from "./AddProject";

export default function ProjectsHeaderList() {
  return (
    <div className="flex w-full items-center justify-between px-4 pt-5 sm:px-10 md:px-15">
      <h1 className="text-dark-text text-xl font-bold md:text-2xl">Projects</h1>
      <div className="">
        <AddProject />
      </div>
    </div>
  );
}
