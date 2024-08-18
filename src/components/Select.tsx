import React, { forwardRef, Ref } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const Select = (
  { children, name, ...props }: SelectProps,
  ref: Ref<HTMLSelectElement>
) => {
  return (
    <select
      name={name}
      ref={ref}
      {...props}
      className="cursor-pointer border border-gray-300 bg-gray-800 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
    >
      {children}
    </select>
  );
};

const ForwardedButton = forwardRef(Select);
export { ForwardedButton as Select };
