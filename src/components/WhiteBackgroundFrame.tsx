import { ReactNode } from "react";

export default function WhiteBackgroundFrame({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-start bg-white-text h-[230px] w-[340px] rounded-lg shadow-for-white-background-frame">
      {children}
    </div>
  );
}
