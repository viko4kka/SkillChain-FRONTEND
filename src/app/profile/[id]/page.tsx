import UserFrameInProfilePage from "@/components/UserFrameInProfilePage";
import ProjectList from "@/components/ProjectList";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const userId = parseInt(id);

  return (
    <div className="flex h-screen flex-col items-center justify-start">
      <div className="mt-[40px] px-4">
        <UserFrameInProfilePage id={userId} />
      </div>
      <br />
      <ProjectList userId={userId} />
    </div>
  );
}
