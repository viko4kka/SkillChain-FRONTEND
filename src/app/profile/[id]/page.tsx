import Select from "@/components/Select";
import UserFrameInProfilePage from "@/components/UserFrameInProfilePage";
import LanguageList from "@/components/language/LanguageList";
import ProjectList from "@/components/project/ProjectList";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = parseInt(id);

  return (
    <div className="flex h-screen flex-col items-center justify-start">
      <div className="mt-[40px] px-4">
        <UserFrameInProfilePage id={Number(userId)} />
      </div>
      <br />
      <ProjectList userId={userId} />
      <br />
      <LanguageList userId={userId} />
    </div>
  );
}
