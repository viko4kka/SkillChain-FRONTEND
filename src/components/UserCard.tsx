'use client'

type UserProps = {
  firstName: string;
  lastName: string;
};

export default function UserCard({ firstName, lastName }: UserProps) {
  return (
    <div className="mt-4 flex items-start gap-4 rounded-xl border bg-white p-4 shadow-md">
      <div>
        <h2 className="text-lg font-semibold">
          {firstName} {lastName}
        </h2>
      </div>
    </div>
  );
}