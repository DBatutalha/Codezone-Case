import React from "react";
import Image from "next/image";

export default function MusicPlatformsBanner() {
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden min-[429px]:block relative w-[602.76px] h-[126.62px]">
        {/* Slanted White Background */}
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 520 120"
          preserveAspectRatio="none"
        >
          <polygon points="0,0 520,0 490,80 0,120" fill="#fff" />
        </svg>
        {/* Logos Row */}
        <div className="absolute top-0 left-10 w-full h-full flex items-center pl-8 gap-8 z-10">
          <Image
            src="/vectors/Favorites/yt.svg"
            alt="YouTube"
            width={150}
            height={40}
          />
          <Image
            src="/vectors/Favorites/spotify.svg"
            alt="Spotify"
            width={150}
            height={40}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="hidden max-[428px]:block relative w-[80%] h-[80px] ">
        {/* Slanted White Background */}
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 520 120"
          preserveAspectRatio="none"
        >
          <polygon points="0,0 520,0 490,80 0,120" fill="#fff" />
        </svg>
        {/* Logos Row */}
        <div className="absolute top-0 left-4 w-full h-full flex items-center pl-4 gap-4 z-10">
          <Image
            src="/vectors/Favorites/yt.svg"
            alt="YouTube"
            width={80}
            height={20}
          />
          <Image
            src="/vectors/Favorites/spotify.svg"
            alt="Spotify"
            width={80}
            height={20}
          />
        </div>
      </div>
    </>
  );
}
