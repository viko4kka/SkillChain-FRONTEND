type Props = {
  languages: { name: string }[];
};

export default function LanguageDisplay({ languages }: Props) {
  if (languages.length === 0) return null;

  return (
    <div className="flex flex-row gap-x-0.5">
      {languages.slice(0, 3).map((lang, index) => (
        <span
          key={index}
          className="bg-mainPurple text-mainPurpleText rounded-full px-2.5 py-1 text-xs"
        >
          {lang.name}
        </span>
      ))}
      {languages.length > 3 && (
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
          +{languages.length - 3} more
        </span>
      )}
    </div>
  );
}
