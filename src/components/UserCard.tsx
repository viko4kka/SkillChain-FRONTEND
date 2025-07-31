type UserProps = {
  firstName: string;
  lastName: string;
  job: string;
  description?: string;
};

export default function UserCard({
  firstName,
  lastName,
  job,
  description,
}: UserProps) {
  return (
    <div className="mt-4 flex items-start gap-4 rounded-xl border bg-white p-4 shadow-md">
      <div>
        <h2 className="text-lg font-semibold">
          {firstName} {lastName}
        </h2>
        <p className="text-sm text-gray-600">{job}</p>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>
    </div>
  );
}
