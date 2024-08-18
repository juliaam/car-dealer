import React, { forwardRef, Ref } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = (
  { children, disabled, className, ...props }: ButtonProps,
  ref: Ref<HTMLButtonElement>
) => {
  const baseStyles =
    "border-white bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 ";
  const enabledStyles = "hover:bg-gray-700 focus:ring-gray-600";
  const disabledStyles = "bg-gray-400 text-gray-200 cursor-normal";

  return (
    <button
      {...props}
      ref={ref}
      disabled={disabled}
      className={twMerge(
        baseStyles,
        className,
        disabled ? disabledStyles : enabledStyles
      )}
    >
      {children}
    </button>
  );
};

const ForwardedButton = forwardRef(Button);
export { ForwardedButton as Button };
