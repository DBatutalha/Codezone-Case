import React from "react";

export default function WaveEffect({
  height = 192,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  return (
    <>
      {/* Desktop Wave */}
      <div
        className={`hidden min-[429px]:block absolute bottom-0 left-0 right-0 z-[55] pointer-events-none w-full ${className}`}
        style={{ height: `${height}px` }}
      >
        <img
          src="/Images/Twitch/vector.svg"
          alt="Wave Effect"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(.99) saturate(100%)" }}
        />
      </div>

      {/* Mobile Wave */}
      <div
        className={`hidden max-[428px]:block absolute bottom-0 left-0 right-0 z-[55] pointer-events-none w-full ${className}`}
        style={{ height: "110px" }}
      >
        <img
          src="/Images/Twitch/vector.svg"
          alt="Wave Effect"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(.99) saturate(100%)" }}
        />
      </div>
    </>
  );
}
