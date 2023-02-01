import React from "react";

export interface IChevronIconProps {}

export const ChevronIcon: React.FC<IChevronIconProps> = () => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.5 8.25L11 13.75L16.5 8.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};