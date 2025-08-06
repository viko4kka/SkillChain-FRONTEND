import React, { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
  "flex flex-row items-center cursor-pointer justify-center rounded-sm transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 whitespace-normal text-center",
  {
    variants: {
      variant: {
        simple: "bg-transparent text-mainBlue hover:bg-main-background",
        primary: "bg-mainBlue text-white hover:bg-mainBlueHover",
        secondary:
          "bg-main-background text-mainBlue hover:bg-mainLightBlueHover",
      },
      size: {
        sm: "py-1 px-3 text-sm",
        md: "py-1.5 px-3.5 text-base",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

interface ButtonProps extends VariantProps<typeof button> {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  variant,
  size,
  fullWidth = false,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={button({ variant, size, fullWidth })}
      type={type}
      disabled={disabled}
    >
      <div className="flex items-center gap-x-0.5">{children}</div>
    </button>
  );
}
