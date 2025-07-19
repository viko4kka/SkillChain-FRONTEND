import { ReactNode } from "react";

export default function WhiteBackgroundFrame({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="bg-white-text 500:w-[450px] shadow-for-white-background-frame flex h-full w-[340px] flex-col items-center justify-start rounded-lg sm:w-[600px] lg:w-[850px]">
      {children}
    </div>
  );
}
