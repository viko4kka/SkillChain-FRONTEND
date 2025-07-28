
"use client";

import UserFrameInProfilePage from "@/components/UserFrameInProfilePage";
import useAuth from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="flex h-screen flex-col items-center justify-start">
      <div className="mt-[40px] px-4">
        <UserFrameInProfilePage id={user?.id} />
      </div>
      <br />
    </div>
  );
}
