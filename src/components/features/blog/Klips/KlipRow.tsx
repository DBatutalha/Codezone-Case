"use client";

import { klips } from "@/data/constants";
import React, { useState } from "react";
import VideoPlayer from "@/components/ui/VideoPlayer";

export default function KlipRow({ klip }: { klip: (typeof klips)[0] }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  console.log("KlipRow - klip.img:", klip.img);
  console.log("KlipRow - isPlaying:", isPlaying);

  return (
    <div key={klip.title} className="flex flex-col gap-y-4">
      <div className="w-full aspect-video">
        <VideoPlayer
          src={isPlaying ? klip.video : ""}
          poster={klip.img || "/Images/Klips/klip1.png"}
          title={klip.title || "klip"}
          className="w-full h-full"
          autoPlay={false}
          muted={true}
          showControls={isPlaying}
          onPlay={handlePlay}
        />
      </div>
      <div className="text-white text-xl font-saira-bold uppercase leading-[104%] tracking-normal">
        {klip.description}
      </div>
    </div>
  );
}
