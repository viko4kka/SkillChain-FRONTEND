"use client";

import { DisplayUser } from "@/hooks/useUsers";

type UserProps = {
  user: DisplayUser;
};

//everything is done, but Piotrek only need to add here design for UserCard component and UserList
//he should add here only error handlind like 'users not found' and add here spinner, 
// number of users above users list also should be displayed like in Figma design
//also is one more thing to correct in file Search.tsx

export default function UserCard({ user }: UserProps) {
  return (
    <div className="mt-4 flex items-start gap-4 rounded-xl border bg-white p-4 shadow-md">
      <div>
        <h2 className="text-lg font-semibold">
          {user.firstName} {user.lastName}
        </h2>
        {user.userSkills.map((skill, index) => (
          <p key={index}>{skill.skill.name}</p>
        ))}
        <p>{user.location?.name}</p>
        {user.userLanguages.map((language, index) => (
          <p key={index}>{language.language.name}</p>
        ))}
      </div>
    </div>
  );
}
