<<<<<<< HEAD
=======
//src/app/profile.page.tsx
>>>>>>> ce256d0 (login, logout, authorization)
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import UserFrameInProfilePage from "@/components/UserFrameInProfilePage";
// import ProjectList from "@/components/ProjectList";

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.replace("/login");
    }
  }, [isAuthenticated, user]);

  if (!user) return null;

  return (
    <div className="flex h-screen flex-col items-center justify-start">
      <div className="mt-[40px] px-4">
        <UserFrameInProfilePage id={user.id} />
      </div>
      <br />
      {/* <ProjectList userId={user.id} /> */}
    </div>
  );
}
