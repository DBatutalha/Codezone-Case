import React from "react";

export default function DiscoverCategoryRow({
  title,
  isSelected = false,
  onClick,
}: {
  title: string;
  isSelected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`border w-fit py-1 px-4 text-[1.1vw] max-[428px]:py-2 max-[428px]:px-3 max-[428px]:text-xs max-[428px]:whitespace-nowrap max-[428px]:min-w-[80px] max-[428px]:text-center transition-colors hover:bg-[#F0E74D] hover:border-[#F0E74D] hover:text-black ${
        isSelected
          ? "bg-[#F0E74D] text-black border-[#F0E74D] font-saira-bold"
          : "text-white border-white font-saira-normal"
      }`}
    >
      {title}
    </button>
  );
}
