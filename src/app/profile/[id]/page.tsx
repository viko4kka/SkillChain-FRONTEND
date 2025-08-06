import ApproveButton from "@/components/ApproveButton";
import UserFrameInProfilePage from "@/components/userProfile/UserFrameInProfilePage";
import ProjectList from "@/components/project/ProjectList";
import SkillList from "@/components/skill/SkillList";
import LanguageList from "@/components/language/LanguageList";

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
      <SkillList userId={userId} />
      <br />
      <LanguageList userId={userId} />
      <div className="mt-10">
        <ApproveButton />
      </div>
    </div>
  );
}
