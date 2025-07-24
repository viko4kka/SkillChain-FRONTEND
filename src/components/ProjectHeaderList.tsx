import AddProject from "./AddProject";

export default function ProjectsHeaderList() {
  return (
    <div className="m-5 flex w-full items-center justify-between">
      <h1 className="text-dark-text ml-5 text-xl font-bold md:text-2xl">
        Projects
      </h1>
      <div className="mr-5">
        <AddProject />
      </div>
    </div>
  );
}
