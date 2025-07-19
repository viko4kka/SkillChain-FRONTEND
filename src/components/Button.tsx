import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?:
    | "lightButtonMobile"
    | "darkBlueButtonMobile"
    | "darkBlueButtonMetaMaskMobile";
}

export default function Button({
  children,
  onClick,
  variant = "lightButtonMobile",
}: ButtonProps) {
  const styles = "flex flex-row items-center rounded-lg transition-all";
  const variants = {
    lightButtonMobile:
      "bg-main-background text-mainBlue text-sm hover:bg-mainLightBlueHover py-1.5 px-3.5",
    darkBlueButtonMobile:
      "bg-mainBlue text-sm text-white hover:bg-mainBlueHover py-1.5 px-3.5 ",
    darkBlueButtonMetaMaskMobile:
      "bg-mainBlue w-[105px] h-[40px] lg:w-[120px] lg:h-[40px]  text-white text-xs lg:text-sm lg:py-6  hover:bg-mainBlueHover",
  };

  return (
    <button onClick={onClick} className={`${styles} ${variants[variant]}`}>
      <div className="flex items-center gap-x-0.5">{children}</div>
    </button>
  );
}
