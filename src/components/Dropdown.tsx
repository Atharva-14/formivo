import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Options {
  label: string;
  value: React.ReactNode;
}

interface DropdownProps {
  options: Options[];
  onSelect: (options: Options) => void;
  selOpt: Options;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, selOpt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    selOpt ? selOpt : options[0]
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: Options) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center justify-between w-[36px] h-5 gap-0 opacity-50 focus:outline-none"
      >
        <div className="flex items-center">
          <span className="w-5 h-5 px-[2.5px] flex items-center justify-center text-gray-1000">
            {selectedOption.value}
          </span>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="w-4 h-4 flex items-center justify-center text-gray-1000"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 6.23828L8.5 10.2383L12.5 6.23828"
              stroke="#0D0D0D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-20 top-full mt-2 w-[300px] bg-white border rounded-3xl p-1 gap-2 shadow-md border-gray-200">
          <ul>
            <li className="px-4 py-2 rounded-lg gap-4 bg-gray-50 font-semibold">
              <p className="font-inter font-semibold text-xs tracking-[0.04em] text-gray-500">
                INPUT TYPES
              </p>
            </li>
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="cursor-pointer flex items-center gap-2 p-2 rounded-2xl"
              >
                <span className="text-gray-1000 flex items-center w-5 h-5">
                  {option.value}
                </span>
                <span className="text-gray-1000">{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
