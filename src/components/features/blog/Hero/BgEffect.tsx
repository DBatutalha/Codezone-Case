import React from "react";

export default function BgEffect() {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(/Images/Dust.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.15,
          mixBlendMode: "multiply",
        }}
      />

      <div
        className="absolute "
        style={{
          top: "10%",
          left: "40%",
          width: "700px",
          height: "700px",
        }}
      >
        <img
          src="/Images/Blog/crown.svg"
          alt="Crown"
          className="w-auto h-auto"
        />
      </div>
    </>
  );
}
