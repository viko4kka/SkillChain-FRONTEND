type Props = {
  skills: { name: string }[];
};

export default function SkillUserDisplay({ skills }: Props) {
  if (skills.length === 0) return null;

  return (
    <div className="mt-2 flex flex-row gap-2">
      {skills.slice(0, 3).map((skill, index) => (
        <span
          key={index}
          className="bg-main-background text-mainBlue rounded-full px-2.5 py-1 text-xs"
        >
          {skill.name}
        </span>
      ))}
      {skills.length > 3 && (
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
          +{skills.length - 3} more
        </span>
      )}
    </div>
  );
}
