import Image from "next/image";
import React from "react";

export default function Title({
  title,
  subtitle,
  icon,
  className,
  titleClassName,
}: {
  title: string;
  subtitle?: string;
  icon?: string;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={`flex flex-row items-center gap-x-6 mb-8 max-[428px]:gap-x-3 ${className}`}
    >
      <div className="relative">
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-saira-black leading-[0.9] text-left tracking-tight max-[428px]:text-2xl max-[428px]:text-center ${
            titleClassName ? titleClassName : "text-white"
          }`}
        >
          {title}{" "}
          {subtitle && (
            <>
              <br />
              <span className="gradient-text font-saira-extrabold">
                {subtitle}
              </span>
            </>
          )}
        </h1>
        {/* Decorative element */}
        <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full"></div>
      </div>
      {icon && icon !== "false" && (
        <div className="flex-shrink-0 animate-pulse">
          <Image
            src={icon || "/vectors/Discover/compass.svg"}
            alt="icon"
            width={64}
            height={64}
            className="filter brightness-110 hover:brightness-125 transition-all duration-300 max-[428px]:w-8 max-[428px]:h-8"
          />
        </div>
      )}
    </div>
  );
}
