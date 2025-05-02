import React from "react";

interface SearchFieldProps {
  label: string;
  value: string;
  icon: "calendar" | "person";
}

const SearchField: React.FC<SearchFieldProps> = ({ label, value, icon }) => {
  return (
    <div className="relative bg-white rounded-md h-[60px] cursor-pointer hover:bg-gray-50 transition duration-300">
      <div className="h-full flex flex-col justify-center px-4">
        <div className="text-gray-500 text-xs font-medium">{label}</div>
        <div className="flex items-center justify-between">
          <div className="text-gray-800 font-medium">{value}</div>
          <div className="text-gray-400">
            {icon === "calendar" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="calendar"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="user"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 1 0-16 0" />
              </svg>
            )}
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 h-full flex items-center pr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="chevron-down text-gray-400"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
};

export default SearchField;
