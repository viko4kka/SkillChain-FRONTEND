import AddSkill from "./AddSkill";

export default function SkillsListHeader({
  addSkillProps,
  canEdit,
}: {
  addSkillProps?: any;
  canEdit?: boolean;
}) {
  return (
    <div className="flex w-full items-center justify-between px-4 pt-4 sm:px-10 sm:pt-8 lg:px-15 lg:pt-13">
      <h1 className="text-dark-text text-xl font-bold sm:text-2xl lg:text-3xl">
        Skills
      </h1>
      <div>{canEdit && <AddSkill {...addSkillProps} />}</div>
    </div>
  );
}
