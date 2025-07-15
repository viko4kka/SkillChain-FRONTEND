import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "lightButtonMobile" | "secondary" | "tertiary";
}

export default function Button({
  children,
  variant = "lightButtonMobile",
}: ButtonProps) {
  const styles =
    "flex flex-row items-center rounded-lg py-1 px-2.5 transition-all";
  const variants = {
    lightButtonMobile: "bg-main-background text-mainBlue text-sm ",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    tertiary: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button className={`${styles} ${variants[variant]}`}>{children}</button>
  );
}
