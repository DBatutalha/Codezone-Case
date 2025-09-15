export default function Container({
  children,
  size = "main",
  className = "",
  style,
}: {
  children: React.ReactNode;
  size?: "main" | "wide" | "narrow" | "content" | "full";
  className?: string;
  style?: React.CSSProperties;
}) {
  const sizes: { [key: string]: string } = {
    main: "max-w-[1440px] w-full",
    wide: "max-w-[1600px] w-full",
    narrow: "max-w-[800px] w-full",
    content: "max-w-[1200px] w-full",
    full: "w-full",
  };

  return (
    <div
      className={`${sizes[size]} mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-[428px]:px-4 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
