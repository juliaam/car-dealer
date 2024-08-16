"use client";
import { ReactNode, useState } from "react";

interface DropdownProps {
  children?: ReactNode;
}

export function Dropdown({ children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select an option");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="bg-gray-800 text-white p-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
      >
        {selected}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {children}
        </div>
      )}
    </div>
  );
}
