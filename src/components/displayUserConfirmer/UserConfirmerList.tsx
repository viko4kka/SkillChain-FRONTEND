import { Approver } from "@/hooks/useConfirmations";
import UserConfirmerCard from "./UserConfirmerCard";

export default function UserConfirmerList({
  confirmations,
}: {
  confirmations: Approver[];
}) {
  if (!confirmations?.length)
    return (
      <div className="flex flex-row items-center justify-center gap-2 px-4 py-4">
        <p className="text-gray-500">No confirmations yet</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-1 px-4">
      <h2>Approved by</h2>
      {confirmations.map((user) => (
        <UserConfirmerCard
          key={user.id}
          id={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
          imgUrl={user.imgUrl}
          job={user.job}
        />
      ))}
    </div>
  );
}
