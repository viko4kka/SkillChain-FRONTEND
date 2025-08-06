type Props = {
  skills: { name: string }[];
};

export default function SkillUserDisplay({ skills }: Props) {
  if (skills.length === 0) return null;

  return (
    <>
      {skills.slice(0, 3).map((skill, index) => (
        <div className="m-1" key={index}>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            {skill.name}
          </span>
        </div>
      ))}
      {skills.length > 3 && (
        <div className="m-1">
          <span className=" inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            +{skills.length - 3} more
          </span>
        </div>
      )}
    </>
  );
}
