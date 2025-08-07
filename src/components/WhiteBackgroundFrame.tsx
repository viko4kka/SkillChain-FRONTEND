import { ReactNode } from "react";

export default function WhiteBackgroundFrame({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="bg-white-text 500:w-[450px] flex w-[340px] flex-col justify-start rounded-lg p-4 shadow-sm sm:w-[600px] lg:w-[850px]">
      {children}
    </div> 
  );
}
