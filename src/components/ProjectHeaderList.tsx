import AddProject from "./AddProject";

export default function ProjectsHeaderList() {
  return (
    <div className="m-5 flex w-full items-center justify-between">
      <h1 className="ml-5 text-2xl font-bold">Projects</h1>
      <div className="mr-5">
        <AddProject />
      </div>
    </div>
  );
}
