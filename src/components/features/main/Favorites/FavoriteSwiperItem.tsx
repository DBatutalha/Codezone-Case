import Image from "next/image";
import React from "react";

export default function FavoriteSwiperItem({
  slide,
}: {
  slide: {
    img: string;
    title: string;
    subtitle: string;
    rank: string;
  };
}) {
  return (
    <div
      className="group flex flex-col justify-center gap-y-4 overflow-hidden w-[15vw]  relative"
      style={{
        backgroundImage: "url('/Images/Trends/trends-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "0 12px 30px 60px",
        aspectRatio: "272/276",
      }}
    >
      <div
        className="album-image-container absolute z-10 transition-all duration-300 left-[-100px] top-[40px] group-hover:left-1/2 group-hover:top-1/2 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2"
        style={{
          width: "10vw",
          aspectRatio: "1/1",
          borderRadius: "7.86px",
          overflow: "hidden",
        }}
      >
        <Image
          src={slide.img || "/Images/Favorites/cover1.png"}
          fill
          sizes="10vw"
          alt="Album Cover"
          className="album-image transition-transform duration-300 "
        />
      </div>
      {/* Rank badge */}
      <div className="bg-[#323232] text-[1.1vw] px-4 py-1 rounded-full text-white  w-fit mx-auto font-saira-normal flex items-center transition-opacity duration-300 group-hover:opacity-0">
        <span className="mr-1">{slide.rank.split("(")[0]}</span>
        <span className="font-bold">({slide.rank.split("(")[1]}</span>
      </div>
      <div className="text-center text-[1.4vw] transition-opacity duration-300 group-hover:opacity-0">
        <div className="text-white  font-saira-normal">{slide.title}</div>
        <div className="text-white  font-saira-bold">{slide.subtitle}</div>
      </div>
    </div>
  );
}
