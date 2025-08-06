type Props = {
  languages: { name: string }[];
};

export default function LanguageDisplay({ languages }: Props) {
  if (languages.length === 0) return null;

  return (
    <>
      {languages.slice(0, 2).map((language, index) => (
        <div className="m-1" key={index}>
          <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
            {language.name}
          </span>
        </div>
      ))}
      {languages.length > 2 && (
        <div className="m-1">
          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            +{languages.length - 2} more
          </span>
        </div>
      )}
    </>
  );
}
